const Veterinarian = require('../models/Veterinarian');
<<<<<<< HEAD

const createVeterinarian = async (req, res) => {
  try {
    const { name } = req.body;
    const newVeterinarian = new Veterinarian({ name });
    await newVeterinarian.save();
    res.status(201).json(newVeterinarian);
=======
const Appointment = require('../models/Appointment');

const addVeterinarian = async (req, res) => {
  const { name, lastName } = req.body;
  try {
    const newVet = new Veterinarian({ name, lastName });
    await newVet.save();
    res.status(201).json(newVet);
>>>>>>> 161d6bd72c78bb7e3e53d1f21984e6e40d7c8b0f
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllVeterinarians = async (req, res) => {
  try {
<<<<<<< HEAD
    const veterinarians = await Veterinarian.find();
    res.json(veterinarians);
=======
    const vets = await Veterinarian.find();
    res.status(200).json(vets);
>>>>>>> 161d6bd72c78bb7e3e53d1f21984e6e40d7c8b0f
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

<<<<<<< HEAD
module.exports = { createVeterinarian, getAllVeterinarians };
=======
const deleteVeterinarian = async (req, res) => {
  const vetId = req.params.id;
  try {
    // Eliminar turnos asociados al veterinario
    await Appointment.deleteMany({ veterinarian: vetId });
    // Eliminar el veterinario
    await Veterinarian.findByIdAndDelete(vetId);
    res.status(200).json({ message: 'Veterinario y turnos eliminados correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addVeterinarian, getAllVeterinarians, deleteVeterinarian };
>>>>>>> 161d6bd72c78bb7e3e53d1f21984e6e40d7c8b0f
