const mongoose = require('mongoose');
const Appointment = require('../models/Appointment'); // Ajusta la ruta según tu estructura de proyecto
const Pet = require('../models/Pet'); // Ajusta la ruta según tu estructura de proyecto


const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
const MAX_APPOINTMENTS_PER_DAY = TIME_SLOTS.length;

const createAppointment = async (req, res) => {
  const { pet, veterinarian, date, timeSlot } = req.body;

  try {
    // Validar que todos los campos necesarios estén presentes
    if (!pet || !veterinarian || !date || !timeSlot) {
      return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    // Asegurarse de que pet y veterinarian sean ObjectId válidos
    const petId = new mongoose.Types.ObjectId(pet);
    const veterinarianId = new mongoose.Types.ObjectId(veterinarian);

    // Crear una nueva cita
    const newAppointment = new Appointment({
      pet: petId,
      veterinarian: veterinarianId,
      date,
      timeSlot
    });

    // Guardar la nueva cita
    await newAppointment.save();

    // Actualizar la referencia de la cita en el documento de la mascota
    const petDoc = await Pet.findById(petId);
    if (petDoc) {
      petDoc.appointment = newAppointment._id;
      await petDoc.save();
    } else {
      return res.status(404).json({ message: 'Mascota no encontrada.' });
    }

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error creando la cita:', error); // Log para el desarrollador
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Controlador para obtener citas por veterinario y fecha
const getAppointmentsByVeterinarianAndDate = async (req, res) => {
  const { veterinarianId, date } = req.params;

  try {
    // Buscar todas las citas para el veterinario y fecha específicos
    const appointments = await Appointment.find({ veterinarian: veterinarianId, date });

    // Retornar las citas encontradas como respuesta
    res.status(200).json(appointments);
  } catch (error) {
    // Manejo de errores: cualquier error durante la búsqueda será capturado y devuelto como respuesta 500
    res.status(500).json({ message: error.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate({
        path: 'pet',
        populate: { path: 'owner', select: 'firstName lastName dni' } // Agregar 'dni' aquí
      })
      .populate('veterinarian', 'name');

    const formattedAppointments = appointments.map(appointment => ({
      ...appointment.toObject(),
      date: appointment.date.toISOString().split('T')[0], // Formato ISO 8601 solo la fecha (YYYY-MM-DD)
    }));

    res.status(200).json(formattedAppointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateAppointment = async (req, res) => {
  const { date, timeSlot, deleteAppointment } = req.body;
  const { id } = req.params; // id de la cita a actualizar

  try {
    // Ensure the id is cast to ObjectId
    const appointmentId = new mongoose.Types.ObjectId(id);

    // Busca la cita por su ID en la base de datos
    const appointment = await Appointment.findById(appointmentId);

    // Si no se encuentra la cita, retorna un error 404
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Si se solicita eliminar la cita
    if (deleteAppointment) {
      // Eliminar la cita
      await Appointment.findByIdAndDelete(appointmentId);

      // Actualiza la referencia de la cita en la mascota correspondiente
      const pet = await Pet.findById(appointment.pet);
      if (pet) {
        pet.appointment = null;
        await pet.save();
      }

      // Retorna una respuesta indicando que la cita fue eliminada
      return res.status(200).json({ message: 'Appointment deleted successfully' });
    }

    // Actualiza los campos de la cita
    if (date) appointment.date = date;
    if (timeSlot) appointment.timeSlot = timeSlot;

    // Guarda la cita actualizada en la base de datos
    await appointment.save();

    // Retorna la cita actualizada como respuesta
    res.status(200).json(appointment);
  } catch (error) {
    // Manejo de errores: cualquier error durante el proceso será capturado y devuelto como respuesta 500
    res.status(500).json({ message: error.message });
  }
};
const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    // Ensure the id is cast to ObjectId
    const appointmentId = new mongoose.Types.ObjectId(id);

    // Find the appointment by its ID
    const appointment = await Appointment.findById(appointmentId);

    // If the appointment is not found, return a 404 error
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Remove the appointment
    await appointment.deleteOne();

    // Update the pet's appointment reference
    const pet = await Pet.findById(appointment.pet);
    if (pet) {
      pet.appointment = null;
      await pet.save();
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener fechas no disponibles para un veterinario específico
const getUnavailableDates = async (req, res) => {
  const { veterinarianId } = req.params;

  try {
    const appointments = await Appointment.find({ veterinarian: veterinarianId });
    const unavailableDates = appointments.reduce((dates, appointment) => {
      const date = appointment.date.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
      if (!dates[date]) {
        dates[date] = [];
      }
      dates[date].push(appointment.timeSlot);
      return dates;
    }, {});

    const fullyBookedDates = Object.keys(unavailableDates).filter(date => unavailableDates[date].length >= MAX_APPOINTMENTS_PER_DAY);

    res.json(fullyBookedDates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verificar disponibilidad de una fecha específica para un veterinario
const checkDateAvailability = async (req, res) => {
  const { veterinarianId, date } = req.params;

  try {
    const appointments = await Appointment.find({ veterinarian: veterinarianId, date });
    const bookedTimeSlots = appointments.map(appointment => appointment.timeSlot);
    const availableTimeSlots = TIME_SLOTS.filter(slot => !bookedTimeSlots.includes(slot));

    res.json(availableTimeSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createAppointment,
  getAppointmentsByVeterinarianAndDate,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  getUnavailableDates,
  checkDateAvailability
};