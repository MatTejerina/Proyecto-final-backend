const express = require('express');
const { deleteAppointment,updateAppointment,getUnavailableDates,checkDateAvailability, createAppointment, getAppointmentsByVeterinarianAndDate, getAllAppointments } = require('../controllers/appointmentController');
const router = express.Router();

router.post('/appointments', createAppointment);
router.get('/appointments', getAllAppointments);
// Ruta para obtener citas por veterinario y fecha
router.get('/appointments/:veterinarianId/:date', getAppointmentsByVeterinarianAndDate);
router.put('/appointments/:id', updateAppointment); 
router.put('/appointments/:id/', updateAppointment);
router.delete('/appointments/:id', deleteAppointment); 
router.delete('/appointments/:id/', deleteAppointment);  
router.get('/appointments/unavailable-dates/:veterinarianId', getUnavailableDates);
router.get('/appointments/check-date/:veterinarianId/:date', checkDateAvailability);

module.exports = router;