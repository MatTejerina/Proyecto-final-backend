const { Router } = require('express');
const { addUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { tokenValidation } = require('../middleware/tokenValidation');
const route = Router();

// Agregar nuevo usuario
route.post('/users', addUser);
// Editar usuario
route.patch('/users/:id', updateUser);  // Corrección del error tipográfico
// Eliminar usuario
route.delete('/users/:id', deleteUser);
// Consultar usuarios
route.get('/users', tokenValidation, getAllUsers);
// Buscar por ID
route.get('/users/:id', getUserById);

module.exports = route;