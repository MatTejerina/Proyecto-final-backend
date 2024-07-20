const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');
const Pet = require('../models/Pet');


const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
const MAX_APPOINTMENTS_PER_DAY = TIME_SLOTS.length;

const createAppointment = async (req, res) => {
  const { pet, veterinarian, date, timeSlot } = req.body;

  try {
    if (!pet || !veterinarian || !date || !timeSlot) {
      return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    const petId = new mongoose.Types.ObjectId(pet);
    const veterinarianId = new mongoose.Types.ObjectId(veterinarian);

    const newAppointment = new Appointment({
      pet: petId,
      veterinarian: veterinarianId,
      date,
      timeSlot
    });

    await newAppointment.save();

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

const getAppointmentsByVeterinarianAndDate = async (req, res) => {
  const { veterinarianId, date } = req.params;

  try {
        const appointments = await Appointment.find({ veterinarian: veterinarianId, date });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate({
        path: 'pet',
        populate: { path: 'owner', select: 'firstName lastName' }
      })
      .populate('veterinarian', 'name');

    const formattedAppointments = appointments.map(appointment => ({
      ...appointment.toObject(),
      date: appointment.date.toISOString().split('T')[0],
    }));

    res.status(200).json(formattedAppointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const updateAppointment = async (req, res) => {
  const { date, timeSlot, deleteAppointment } = req.body;
  const { id } = req.params;

  try {
    const appointmentId = new mongoose.Types.ObjectId(id);

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (deleteAppointment) {
      await Appointment.findByIdAndDelete(appointmentId);

      const pet = await Pet.findById(appointment.pet);
      if (pet) {
        pet.appointment = null;
        await pet.save();
      }

      return res.status(200).json({ message: 'Appointment deleted successfully' });
    }

    if (date) appointment.date = date;
    if (timeSlot) appointment.timeSlot = timeSlot;

    await appointment.save();

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointmentId = new mongoose.Types.ObjectId(id);

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    await appointment.deleteOne();

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

const getUnavailableDates = async (req, res) => {
  const { veterinarianId } = req.params;

  try {
    const appointments = await Appointment.find({ veterinarian: veterinarianId });
    const unavailableDates = appointments.reduce((dates, appointment) => {
      const date = appointment.date.toISOString().split('T')[0];
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