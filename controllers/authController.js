const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) return response.status(404).json({ message: 'User does not exist' })

    const isMatch = bcrypt.compareSync(password, user.password); //dato que ingresa y el que esta almacenado
    if (!isMatch) return response.status(404).json({ massage: 'Invalid password' })

    //En memoria de la app  
    const accessToken = jwt.sign({ id: user._id, fistName: user.firstName + user.lastName, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: '1h'
    });

    //En una cookie de tipo httpOnly
    const refreshToken = jwt.sign({ id: user._id, fistName: user.firstName + user.lastName, isAdmin: user.isAdmin }, process.env.REFRESH_TOKEN_KEY, {
      expiresIn: '1d'
    });

    user.refreshToken = refreshToken
    await user.save();

    response.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })//Parametros:nombre de la cookie, que vamos a mandar(payload), configuraciones
    response.status(200).json({ accessToken });

  } catch (error) {
    response.status(500).json({ message: error.message })
  }
}

module.exports = { loginUser };