const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    address: String,
    dni: { type: String, unique: true },
    phone: String,
    password: String,
    isAdmin: Boolean,
});

const User = model('User', userSchema);

module.exports = { User };