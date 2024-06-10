const { Pet } = require('../models/Pet');
const { User } = require('../models/Users');

const addPet = async (request, response) => {
    try {
        const { name, type, age, ownerId } = request.body;

        const newPet = new Pet({
            name,
            type,
            age,
            owner: ownerId
        });

        await newPet.save();
        response.status(200).json({ mensaje: 'Mascota agregada con éxito' });
    } catch (error) {
        response.status(500).json({ mensaje: error.message });
    }
};

const getAllPets = async (request, response) => {
    try {
        const pets = await Pet.find({}).populate('owner');
        response.status(200).json(pets);
    } catch (error) {
        response.status(500).json({ mensaje: 'Error al obtener lista de mascotas' });
    }
};

const getPetsByOwnerId = async (request, response) => {
    const { ownerId } = request.params;
    try {
        const pets = await Pet.find({ owner: ownerId });
        response.status(200).json(pets);
    } catch (error) {
        response.status(500).json({ mensaje: 'Error al obtener mascotas del usuario' });
    }
};

module.exports = { addPet, getAllPets, getPetsByOwnerId };
