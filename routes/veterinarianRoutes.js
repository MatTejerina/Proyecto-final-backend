<<<<<<< HEAD
// routes/veterinarianRoutes.js
const express = require('express');
const { createVeterinarian, getAllVeterinarians } = require('../controllers/veterinarianController');
const router = express.Router();

router.post('/veterinarians', createVeterinarian);
router.get('/veterinarians', getAllVeterinarians);
=======
const express = require('express');
const { addVeterinarian, getAllVeterinarians, deleteVeterinarian } = require('../controllers/veterinarianController');
const router = express.Router();

router.post('/veterinarians', addVeterinarian);
router.get('/veterinarians', getAllVeterinarians);
router.delete('/veterinarians/:id', deleteVeterinarian); // Nueva ruta para eliminar veterinarios
>>>>>>> 161d6bd72c78bb7e3e53d1f21984e6e40d7c8b0f

module.exports = router;