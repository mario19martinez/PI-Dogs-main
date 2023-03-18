// const {Dog, Temperaments} = require('../db')
// const { Op } = require("sequelize");
// require('dotenv').config();
// const { allTemperament } = require("../controllers/temperament")




// const createDogHandler = async (
//     name,
//     height,
//     weight,
//     image,
//     life_span,
//     //createInDb,
//     temperaments
// ) => {
//     const dogDb = await Dog.findAll({
//         where: {
//             name:{
//                 [Op.iLike]: `%${name}%`,
//             },
//         },
//     });
//     if (dogDb.length) return 'Ya existe un perro con ese nombre';

//     const newDog = await Dog.create({
//         name,
//         height,
//         weight,
//         image,
//         life_span,
//         //createInDb
//     });

//     //verifico que la tabla de temperament este cargada, sino la crea.

//     const TemperamentsCount = await Temperaments.count();
//     if (TemperamentsCount === 0){//verifico si ya esta cargado el modelo.
//         await allTemperament();
//     }
//     //asocia los temperamentos al perro.
//     const tempEncontrados = await Promise.all(
//         temperaments.forEach((temp) => {
//             const tempEncontrado = Temperaments.findOne({ where: {name: temp}});

//             if(!tempEncontrado) {
//                 throw new Error(`Tipo de ${temp} no axiste`);
//             }
//             return tempEncontrado;
//             console.log(tempEncontrados)
//         })
//     );
//     await newDog.addTemperaments(tempEncontrados);
//     return newDog;
// };

// module.exports = {
//     createDogHandler
// }