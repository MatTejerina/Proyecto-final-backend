const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true,
  },
  veterinarian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Veterinarian', 
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
