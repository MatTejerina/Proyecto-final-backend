// routes/veterinarianRoutes.js
const express = require('express');
const { createVeterinarian, getAllVeterinarians } = require('../controllers/veterinarianController');
const router = express.Router();

router.post('/veterinarians', createVeterinarian);
router.get('/veterinarians', getAllVeterinarians);

module.exports = router;
