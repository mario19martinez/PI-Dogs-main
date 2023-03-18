// const axios = require("axios");
// const { allDogsControllers } = require("../controllers/dogsControllers");
// const { Dog, Temperaments } = require("../db");

// const createDog = async (name, height, weight, life_span, temperaments) => {
//     try {
//         let [newDog, created] = await Dog.findOrCreate({
//             where: {
//                 name,
//                 height,
//                 weight,
//                 life_span,
//             }
//         })
//         console.log("WOOF WOOF", created)
//         let temperament = await Temperaments.findAll({
//             where: {name: temperaments}
//         })
//         console.log(temperament, "===el temperament buscado===")
//         let temperament2 = temperament.map(el => el.id);
//         console.log(temperament2, "===esto es el temperament2===")
//         newDog.addTemperaments(temperament2)

//         return "Perro creado con exito"
//     }
//     catch(error) {
//         console.error(error);
//     }
// };

// module.exports = {
//     createDog
// }
// const postDogHandler = async (objDog) => {
//     try{
//         const {
//             name, image, height, weight, life_span, temperaments, createInDb
//         } = objDog;
//         const dog = {
//             name,
//             image,
//             height,
//             weight,
//             life_span,
//             createInDb,
//         };
//         console.log(dog);
//         const dogInfo = await Temperaments.findAll({
//             where: {
//                 name: temperaments,
//             },
//         });
//         const createDog = await Dog.create(dog);

//         createDog.addTemperaments(dogInfo);
//         return Dog.findAll();
//     }
//     catch(error){
//         return ({error: error.message})
//     }
// };

// module.exports = {
//     postDogHandler
// }

// const getDogs = async (req, res) => {
//     const { name } = req.query;
//     try {
//         const results = name ? await allDogsControllers(name) :

//         res.status(200).send(results);
//     }
//     catch(error){
//         res.status(404).json({error: error.message});
//     }
// };

// const getIdDogs = async (req, res) => {
//     const {id} = req.params;
//     const source = isNaN(id) ? "bdd" : "api";
//     try {
//         const result = await getDogById(id, source);
//         res.status(200).json(result);
//     }
//     catch(error){
//         res.status(404).json({error: error.message});
//     }
// };

// module.exports = {
//     getIdDogs,
//     getDogs,
// }