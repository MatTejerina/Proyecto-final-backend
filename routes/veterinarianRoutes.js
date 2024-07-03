// routes/veterinarianRoutes.js
const express = require('express');
const { addVeterinarian, getAllVeterinarians } = require('../controllers/veterinarianController');
const router = express.Router();

router.post('/veterinarians', addVeterinarian);
router.get('/veterinarians', getAllVeterinarians);

module.exports = router;