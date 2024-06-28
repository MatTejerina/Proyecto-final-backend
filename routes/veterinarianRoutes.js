const { Router } = require('express');
const { addVeterinarian, getAllVeterinarians } = require('../controllers/veterinarianController');
const route = Router();

// Agregar nuevo veterinario
route.post('/veterinarians', addVeterinarian);
// Obtener todos los veterinarios
route.get('/veterinarians', getAllVeterinarians);

module.exports = route;