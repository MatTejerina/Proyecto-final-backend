const Veterinarian = require('../models/Veterinarian');

const createVeterinarian = async (req, res) => {
  try {
    const { name } = req.body;
    const newVeterinarian = new Veterinarian({ name });
    await newVeterinarian.save();
    res.status(201).json(newVeterinarian);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllVeterinarians = async (req, res) => {
  try {
    const veterinarians = await Veterinarian.find();
    res.json(veterinarians);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createVeterinarian, getAllVeterinarians };