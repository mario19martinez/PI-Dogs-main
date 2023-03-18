const { Dog, Temperaments } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

const allTemperament = async () => {
        let temperament = await Temperaments.findAll()
        if(temperament.length === 0) {
            const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
            //console.log(api)

            let perros = api.data.map(el => el.temperament)
            console.log(perros)

            perros = perros.join()
            perros = perros.split(",")
            perros = perros.map(e => e.trim())
            perros.forEach(async(e) => {
                if(e.length > 0) {
                    await Temperaments.findOrCreate({
                        where:{name: e}
                    })
                }
            })
            temperament = await Temperaments.findAll()
        }
        return temperament;
    }

module.exports = {
    allTemperament
}