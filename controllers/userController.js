const { User } = require('../models/Users');
const bcrypt = require('bcrypt');

const addUser = async (request, response) => {
    try {
        const { firstName, lastName, email, phone, password } = request.body;

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            password: hash
        });
        
        await newUser.save();
        response.status(200).json({ mensaje: 'Usuario creado con éxito' });

    } catch (error) {
        response.status(500).json({ mensaje: error.message });
    }
};

const getAllUsers = async (request, response) => {
    try {
        const users = await User.find({});
        response.status(200).json(users);
    } catch (error) {
        response.status(500).json({ mensaje: 'Error al obtener lista de usuarios' });
    }
};

const getUserById = async (request, response) => {
    const {id} = request.params;
    try {
        const userById = await User.findById(id)
        response.status(200).json(userById)
    } catch (error) {
        response.status(500).json(error)
    }
};

module.exports = { addUser, getAllUsers, getUserById };


// {
//     "firstName": "matias",
//     "lastName": "tejerina",
//     "email": "matias@matias.com",
//     "phone": "3815123123",
//     "password": "123123"
// }