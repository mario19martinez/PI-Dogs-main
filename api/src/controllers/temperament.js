// const { Dog, Temperaments } = require('../db');
// const { API_KEY } = process.env;
// const axios = require("axios");

// const allTemperament = async () => {
//   try{
//     const dogApi = await axios.get(`https://api.thedogapi.com/v1/temperament?api_key=${API_KEY}`)
//     //console.log(dogApi)

//     const temperament = await dogApi.data?.map(el => el.name);
//     console.log(temperament)

//     const temps = temperament.toString().split(',');
//     temps.forEach(temperament => {
//       Temperaments.findOrCreate({
//         where: { name: temperament }
//       })
//     })
//   }
//   catch(error) {
//     console.log(error);
//   }
// }

// const allTemperament = async () => {
//   let temperament = await Temperaments.findAll();
//   if (temperament.length === 0) {
//     const api = await axios.get(
//       `https://api.thedogapi.com/v1/breeds/temperament?api_key=${API_KEY}`
//     );
//     //console.log(api)

//     let perros = api.data.map((el) => el.temperament);
//     console.log(perros);

//     perros = perros.join();
//     perros = perros.split(",");
//     perros = perros.map((e) => e.trim());
//     perros.forEach(async (e) => {
//       if (e.length > 0) {
//         await Temperaments.findOrCreate({
//           where: { name: e },
//         });
//       }
//     });
//     temperament = await Temperaments.findAll();
//   }
//   console.log(temperament)
//   return temperament;
// };

// module.exports = {
//     allTemperament
// }