import Pet from '../models/pet.model.js';
import Appointment from '../models/appointment.model.js';

export const createPet = async (req, res) => {
    try {
        const {name, species, breed, age, gender, price,color, description, imageUrl, arrivedDate} = req.body;
        if (!name || !species || !breed || age === undefined || !gender || price === undefined) {
            return res.status(400).json({message: "All fields are required"});
        }
        const newPet = await Pet.create({
            name,
            species,
            breed,
            age,
            gender,
            price,
            color,
            description,
            images: imageUrl ? [imageUrl] : [],  // dùng field images trong model,
            vaccinations: [],
            status : 'pending',
            arrived_date: arrivedDate ? new Date(arrivedDate) : new Date()
        });
        res.status(201).json({message: "Pet created successfully", pet: newPet});
    } catch (error) {
        console.error("Create pet error:", error);
        res.status(500).json({message: "Server error"});
    }
};

export const getPets = async (req, res) => {
    try {
        const {species, status, name,breed, age} = req.query;
        const filter = {};
        if (species) filter.species = species;
        if (status) filter.status = status;
        if (name) filter.name = { $regex: name, $options: 'i' }; // Tìm kiếm không phân biệt hoa thường
        if (breed) filter.breed = { $regex: breed, $options: 'i' };
        if (age) filter.age = age;
        const pets = await Pet.find(filter);
        res.status(200).json({pets});
    } catch (error) {
        console.error("Get pets error:", error);
        res.status(500).json({message: "Server error"});
    }   
};

export const getPetById = async (req, res) => {
    try {
        const petId = req.params.id;
        const pet = await Pet.findById(petId);
        if (!pet) {
            return res.status(404).json({message: "Pet not found"});
        }
        res.status(200).json({pet});
    } catch (error) {
        console.error("Get pet by ID error:", error);
        res.status(500).json({message: "Server error"});
    }
};

export default {
    createPet,
    getPets,
    getPetById
};