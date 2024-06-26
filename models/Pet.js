const { model, Schema } = require('mongoose');

const petSchema = new Schema({
    name: String,
    type: String,
    race: String,
    age: Number,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }
});

const Pet = model('Pet', petSchema);

module.exports = { Pet };