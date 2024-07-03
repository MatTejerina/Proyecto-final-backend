const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, required: true },
    address: String,
    dni: { type: String, unique: true, required: true },
    phone: String,
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;