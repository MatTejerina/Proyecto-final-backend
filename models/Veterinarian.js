const mongoose = require('mongoose');

const veterinarianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }
});

module.exports = mongoose.model('Veterinarian', veterinarianSchema);