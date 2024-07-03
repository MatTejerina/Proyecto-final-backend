const Veterinarian = require('../models/Veterinarian');

const addVeterinarian = async (req, res) => {
  const { name, lastName } = req.body;
  try {
    const newVet = new Veterinarian({ name, lastName });
    await newVet.save();
    res.status(201).json(newVet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllVeterinarians = async (req, res) => {
  try {
    const vets = await Veterinarian.find();
    res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addVeterinarian, getAllVeterinarians };