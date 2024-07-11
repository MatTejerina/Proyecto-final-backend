const { Router } = require('express');
const { addUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const route = Router();

// Agregar nuevo usuario
route.post('/users', addUser);
// Editar usuario
route.patch('/users/:id', updateUser);
// Eliminar usuario
route.delete('/users/:id', deleteUser);
// Consultar usuarios
route.get('/users', getAllUsers);
// Buscar por ID
route.get('/users/:id', getUserById);

module.exports = route;