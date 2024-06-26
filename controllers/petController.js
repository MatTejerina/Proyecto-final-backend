const { Pet } = require('../models/Pet');

const addPet = async (request, response) => {
    try {
        const { name, type, race, age, ownerId } = request.body;

        const newPet = new Pet({
            name,
            type,
            race,
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
const getPetsByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
      const pets = await Pet.find({ owner: userId });
      res.status(200).json(pets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const updatePet = async (request, response) => {
    const { id } = request.params;
    const { name, type, race, age, ownerId } = request.body;

    try {
        const updatedPet = await Pet.findByIdAndUpdate(id, { name, type, race, age, owner: ownerId }, { new: true });

        if (!updatedPet) {
            return response.status(404).json({ mensaje: 'Mascota no encontrada' });
        }

        response.status(200).json({ mensaje: 'Mascota actualizada con éxito', pet: updatedPet });
    } catch (error) {
        response.status(500).json({ mensaje: error.message });
    }
};

const deletePet = async (request, response) => {
    const { id } = request.params;

    try {
        const deletedPet = await Pet.findByIdAndDelete(id);

        if (!deletedPet) {
            return response.status(404).json({ mensaje: 'Mascota no encontrada' });
        }

        response.status(200).json({ mensaje: 'Mascota eliminada con éxito' });
    } catch (error) {
        response.status(500).json({ mensaje: error.message });
    }
};

module.exports = { addPet, getAllPets, getPetsByOwnerId, updatePet, deletePet, getPetsByUserId };