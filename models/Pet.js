const { model, Schema } = require('mongoose');

const petSchema = new Schema({
    name: String,
    type: String,
    race: String,
    age: Number,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Pet = model('Pet', petSchema);

module.exports = { Pet };