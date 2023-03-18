const { Dog, Temperaments } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
require("dotenv").config();

const BuscaApi = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            image: el.image.url,
            temperament: el.temperament,
            height: el.height.metric + "Kg",
            weight: el.weight.metric + "cm",
            life_span: el.life_span,
        };
    });
    //console.log(apiInfo)
    return apiInfo;
    
}


//db
const buscarenDb = async () => {
    const buscarDb = await Dog.findAll({
        include: {
            model: Temperaments,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }
    });
    //return buscarDb;

    let infoDb = await buscarDb?.map((el) => {
        return {
            id: el.id,
            name: el.name,
            image: el.image,
            temperaments: el.temperament?.map((el) => el.temperament).toString(),
            height: el.height?.map((el) => el.metric),
            weigth: el.weight?.map((el) => el.metric),
            life_span: el.life_span,
            createdInDb: el.createdInDb,
        }
    })
    return infoDb;
};

//todo url y db
const allDogsControllers = async () => {
    const apiInfo = await BuscaApi();
    const dbInfo = await buscarenDb();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}


const dbDogId = async (id) => { // busco perros de mi db por id

    let dog = await Dog.findByPk(id, {
        include: {
            model: Temperaments,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    });

    if(dog === null) {
        throw Error ("Perro no encontrado")
    }
    console.log(dog)
    return dog;
};

const getDog = async (id) => {//busco perros de la api por id
    let dogs = await BuscaApi()

    let foundDog = await dogs.find(d => d.id === parseInt(id))

    if(!foundDog){
        throw Error("no hay perro en api")
    }
    return foundDog;
}

// const createDog = async (name, height, weight, image, life_span, temperament) => {
//  const newPost = await Dog.create({name, height, weight, image, life_span});

//  await newPost.addTemperaments(temperament)
// };

module.exports = {
    allDogsControllers,
    dbDogId,
    getDog,
    //createDog
};