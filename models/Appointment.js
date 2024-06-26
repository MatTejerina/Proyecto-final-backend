const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet', // Referencia al modelo Pet que representa a la mascota
    required: true,
  },
  veterinarian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Veterinarian', // Referencia al modelo Veterinarian que representa al veterinario
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
