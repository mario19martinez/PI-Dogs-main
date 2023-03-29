const { Router } = require("express");
const { Dog, Temperaments } = require("../db")
require('dotenv').config();

const router = Router();

// POST DES DOG


router.post('/dogs', async (req, res) => {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { name, image, height, weight, life_span, temperament } = req.body;

    // Crear nuevo perro en la base de datos.
    const newDog = await Dog.create({
      name,
      image,
      height,
      weight,
      life_span,
    });

    // Encuentra los temperamentos asociados con el perro.
    const temperamentsFound = await Temperaments.findAll({
      where: { name: temperament },
    });

    // Asociar los temperamentos con el nuevo perro
    await newDog.addTemperaments(temperamentsFound);

    // Encuentra el nuevo perro por id
    const createdDog = await Dog.findByPk(newDog.id, {
      include: { model: Temperaments },
    });

    // Envia el perro creado como respuesta
    res.status(201).json(createdDog);
  } catch (error) {
    //console.error(error);
    res.status(500).send('Server Error');
  }
});

  


module.exports = router;