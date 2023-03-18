const { Router } = require("express");
//const { postDogHandler } = require("../handlers/getDogs")
const { Dog, Temperaments } = require("../db")
//const { createDog } = require("../handlers/postHanler")
//const {createDogHandler} = require('../handlers/postHanler')
const {allDogsControllers} = require("../controllers/dogsControllers")
require('dotenv').config();

const router = Router();

// POST DES DOG

router.post('/dogs', async (req, res) => {
    try {
      const { name, height, weight, image, life_span, temperaments } = req.body;
  
      // Crear la raza de perro en la base de datos
      const dog = await Dog.create({
        name, height, weight, image, life_span, temperaments
      });
      console.log(dog)
  
      // Relacionar la raza de perro con los temperamentos indicados
      if (temperaments && temperaments.length > 0) {
        const tempArray = await Promise.all(temperaments.filter(temp => {
          return Temperaments.findByPk(temp);
        }));
        await dog.setTemperaments(tempArray);
      }
  
      res.status(201).json({ message: 'Dog created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

router.post('/', async(req, res) => {
  const { name, height, weight, image, life_span, temperaments} = req.body;

  const dogCreated = await Dog.create({
    name,
    height,
    weight,
    image,
    life_span
  });
  const dogDb = await Temperaments.findAll({
    where: { name: temperaments },
  });
  console.log(dogDb)

  await dogCreated.addTemperaments(dogDb);
  res.status(201).send('Dog created successfully!');
})


module.exports = router;