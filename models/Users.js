const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
    refreshToken: String,
});

const User = model('User', userSchema);

module.exports = { User };
