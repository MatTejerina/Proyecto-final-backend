const express = require('express');
const { addVeterinarian, getAllVeterinarians, deleteVeterinarian } = require('../controllers/veterinarianController');
const router = express.Router();

router.post('/veterinarians', addVeterinarian);
router.get('/veterinarians', getAllVeterinarians);
router.delete('/veterinarians/:id', deleteVeterinarian);

module.exports = router;