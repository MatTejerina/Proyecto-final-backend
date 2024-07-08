const { Router } = require('express');
const { addPet, getAllPets, getPetsByOwnerId, updatePet, deletePet } = require('../controllers/petController');
const route = Router();

// Agregar nueva mascota
route.post('/pets', addPet);
// Obtener todas las mascotas
route.get('/pets', getAllPets);
// Obtener mascotas por ID de dueño
route.get('/pets/owner/:ownerId', getPetsByOwnerId);
// Editar mascota
route.patch('/pets/:id', updatePet);
// Eliminar mascota
route.delete('/pets/:id', deletePet);

module.exports = route;