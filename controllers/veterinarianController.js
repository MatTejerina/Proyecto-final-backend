const Veterinarian = require('../models/Veterinarian');
const Pet = require('../models/Pet');
const Appointment = require('../models/Appointment');
const mongoose = require('mongoose');

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
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Verificar si el veterinario existe
    const vet = await Veterinarian.findById(vetId).session(session);
    if (!vet) {
      throw new Error('Veterinario no encontrado');
    }

    // Buscar y eliminar las citas asociadas al veterinario
    const appointments = await Appointment.find({ veterinarian: vetId }).session(session);
    for (const appointment of appointments) {
      // Eliminar la cita
      await Appointment.findByIdAndDelete(appointment._id).session(session);

      // Actualizar la referencia de la cita en el documento de la mascota
      const pet = await Pet.findById(appointment.pet).session(session);
      if (pet) {
        pet.appointment = null;
        await pet.save({ session });
      }
    }

    // Eliminar el veterinario
    await Veterinarian.findByIdAndDelete(vetId).session(session);

    // Confirmar la transacción
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: 'Veterinario y turnos eliminados correctamente' });
  } catch (error) {
    // Revertir la transacción en caso de error
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = { addVeterinarian, getAllVeterinarians, deleteVeterinarian };
