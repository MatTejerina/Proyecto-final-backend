const { Router } = require('express');
const { addPet, getAllPets, getPetsByOwnerId } = require('../controllers/petController');
const route = Router();

// agregar nueva mascota
route.post('/pets', addPet);
// consultar todas las mascotas
route.get('/pets', getAllPets);
// consultar mascotas por ID de usuario
route.get('/pets/owner/:ownerId', getPetsByOwnerId);

module.exports = route;
