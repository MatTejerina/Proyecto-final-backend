const { Router } = require('express');
const { addUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const route = Router();

route.post('/users', addUser);
route.patch('/users/:id', updateUser);
route.delete('/users/:id', deleteUser);
route.get('/users', getAllUsers);
route.get('/users/:id', getUserById);

module.exports = route;