const { Router } = require('express');
const { loginUser } = require('../controllers/authController');
const route = Router();

route.post('/login', loginUser);


module.exports = route;