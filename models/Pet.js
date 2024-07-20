const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: String,
    type: String,
    race: String,
    age: Number,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', default: null }
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;