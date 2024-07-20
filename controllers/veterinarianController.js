const Veterinarian = require('../models/Veterinarian');
const Appointment = require('../models/Appointment');

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

const deleteVeterinarian = async (req, res) => {
  const vetId = req.params.id;
  try {
    await Appointment.deleteMany({ veterinarian: vetId });
    await Veterinarian.findByIdAndDelete(vetId);
    res.status(200).json({ message: 'Veterinario y turnos eliminados correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addVeterinarian, getAllVeterinarians, deleteVeterinarian };
