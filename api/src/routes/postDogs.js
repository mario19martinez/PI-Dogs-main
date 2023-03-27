const { Router } = require("express");
const { Dog, Temperaments } = require("../db")
require('dotenv').config();

const router = Router();

// POST DES DOG


router.post('/dogs', async (req, res) => {
  try {
    // Get the data from the request body
    const { name, image, height, weight, life_span, temperament } = req.body;

    // Create the new dog breed in the database
    const newDog = await Dog.create({
      name,
      image,
      height,
      weight,
      life_span,
    });

    // Find the temperaments associated with the dog
    const temperamentsFound = await Temperaments.findAll({
      where: { name: temperament },
    });

    // Associate the temperaments with the new dog breed
    await newDog.addTemperaments(temperamentsFound);

    // Find the new dog breed by id
    const createdDog = await Dog.findByPk(newDog.id, {
      include: { model: Temperaments },
    });

    // Send the created dog breed as a response
    res.status(201).json(createdDog);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

  


module.exports = router;