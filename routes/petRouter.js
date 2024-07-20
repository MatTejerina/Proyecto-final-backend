const { Router } = require('express');
const { addPet, getAllPets, getPetsByOwnerId, updatePet, deletePet } = require('../controllers/petController');
const route = Router();

route.post('/pets', addPet);
route.get('/pets', getAllPets);
route.get('/pets/owner/:ownerId', getPetsByOwnerId);
route.patch('/pets/:id', updatePet);
route.delete('/pets/:id', deletePet);

module.exports = route;