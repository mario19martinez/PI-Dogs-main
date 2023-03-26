const { Router } = require("express");
//const { postDogHandler } = require("../handlers/getDogs")
const { Dog, Temperaments } = require("../db")
//const { createDog } = require("../handlers/postHanler")
//const {createDogHandler} = require('../handlers/postHanler')
const {allDogsControllers} = require("../controllers/dogsControllers")
const {createDogHandler} = require('../handlers/postHanler')
require('dotenv').config();

const router = Router();

// POST DES DOG

// router.post('/dogs', async(req, res) => {
//   try{
//     const objDog = req.body;
//     if(objDog);
//     console.log(objDog)
//     const newDog = createDogHandler(objDog);
//     res.status(201).send(newDog);
//   }catch(error){
//     res.status(404).json({error: error.message})
//   }
// });


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

// router.post('/dogs', async(req,res) => {
//   const {name, height, weight, image, life_span, temperament} = req.body;
//   try{
//     if(!name || !height || !weight || !image || !life_span || !temperament){
//       throw Error('Falta informacion para crear el perro');
//     }else{
//       const newDog = await createDogHandler(name, height, weight, image, life_span, temperament)
//       res.status(201).json(newDog);
//     }
//   }catch(error){
//     res.status(404).json({error: error.message});
//   }
// });
// router.post('/dogs', async (req, res) => {
//     try {
//       const { name, height, weight, image, life_span, temperament } = req.body;
  
//       // Crear la raza de perro en la base de datos
//       const dog = await Dog.create({
//         name, height, weight, image, life_span, temperament
//       });
//       console.log(dog)
  
//       // Relacionar la raza de perro con los temperamentos indicados
//       if (temperament && temperament.length > 0) {
//         const tempArray = await Promise.all(temperament.filter(tempe => {
//           return Temperaments.findByPk(tempe);
//         }));
//         await dog.addTemperaments(tempArray);
//       }
  
//       res.status(201).json({ message: 'Dog created successfully' });
//     } catch (error) {
//       res.status(500).json({ message: 'Ya hay un perro con ese nombre' });
//     }
//   });
  


module.exports = router;