const { User } = require('../models/Users');
const bcrypt = require('bcrypt');

const addUser = async (request, response) => {
    try {
        const { firstName, lastName, email, address, dni, phone, password, isAdmin } = request.body;

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            address,
            dni,
            phone,
            isAdmin,
            password: hash
        });

        await newUser.save();
        response.status(200).json({ mensaje: 'Usuario creado con éxito' });

    } catch (error) {
        if (error.code === 11000) { // Error de duplicación en Mongoose
            if (error.keyPattern && error.keyPattern.dni) {
                response.status(400).json({ mensaje: 'El DNI ya está registrado' });
            } else if (error.keyPattern && error.keyPattern.email) {
                response.status(400).json({ mensaje: 'El correo electrónico ya está registrado' });
            }
        } else {
            response.status(500).json({ mensaje: error.message });
        }
    }
};

const updateUser = async (request, response) => {
    const { id } = request.params;
    const { firstName, lastName, email, address, dni, phone, password, isAdmin } = request.body;

    try {
        // si cambia de contraseña, háshearla
        let updatedFields = { firstName, lastName, email, address, dni, phone };
        if (password) {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            updatedFields.password = hash;
        }

        // Incluir el campo isAdmin en la actualización si está presente en el request body
        if (typeof isAdmin !== 'undefined') {
            updatedFields.isAdmin = isAdmin;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!updatedUser) {
            return response.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        response.status(200).json({ mensaje: 'Las modificaciones fueron realizadas con éxito' });
    } catch (error) {
        response.status(500).json({ mensaje: error.message });
    }
};

const deleteUser = async (request, response) => {
    const { id } = request.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return response.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        response.status(200).json({ mensaje: 'Usuario eliminado con éxito' });
    } catch (error) {
        response.status(500).json({ mensaje: error.message });
    }
};

    const getAllUsers = async (req, res) => {
        try {
        const users = await User.find().populate('pets', 'name'); // Popula las mascotas solo con el nombre
        res.status(200).json(users);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    };

const getUserById = async (request, response) => {
    const { id } = request.params;
    try {
        const userById = await User.findById(id);
        if (!userById) {
            return response.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        response.status(200).json(userById);
    } catch (error) {
        response.status(500).json({ mensaje: error.message });
    }
};

module.exports = { addUser, getAllUsers, getUserById, updateUser, deleteUser };