const {Router} = require('express');
const {addUser, getAllUsers, getUserById} = require('../controllers/userController');
const route = Router();

//agregar nuevo usuario
route.post('/users', addUser);
//consultar usuarios
route.get('/users', getAllUsers)
// buscar por id
route.get('/users/:id',getUserById)


module.exports = route;
