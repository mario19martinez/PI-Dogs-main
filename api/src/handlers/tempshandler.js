const axios = require('axios')
const { Dog, Temperaments } = require('../db');
const { API_KEY } = process.env;
//const { allTemperament } = require('../controllers/temperament');

const tempsHandler = async () => {
  const temps = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  ); //me trae los temps en forma de arrelgo

  temps.data.forEach((el) => {
    //analizo cada elemento del arreglo de razas
    if (el.temperament) {
      let temps = el.temperament.split(", ");

      temps.forEach((e) => {
        Temperaments.findOrCreate({
          //analizo los arreglos, los desarmo y guardo el name de cada temp
          where: { name: e }, //findOrCreate para que no se repita cuando analice dos con el mismo name
        });
      });
    }
  });
  const findTemps = await Temperaments.findAll(); //lo guardo en esta constante para no volver a hacer todo el proceso
  return findTemps; //así ya la tengo en la base de datos y la puedo sacar de ahí cuando la necesito, no hace falta volver a llamar a la api
};

// const tempsHandler = async (req, res) => {
//     await allTemperament();
//     const tempArray = await Temperaments.findAll();
//     res.status(200).send(tempArray);
//     //res.status(400).json('error')
//     return tempArray;
    
// };

module.exports = {
    tempsHandler
}