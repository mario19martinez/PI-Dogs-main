require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const {allDogsControllers, dbDogId, getDog} = require("../controllers/dogsControllers")
const {allTemperament} = require("../controllers/temperament");
//const { tempsHandler } = require('../handlers/tempshandler')
const { Dog, Temperaments } = require('../db');
//const { Sequelize } = require("sequelize");
const {tempsHandler} = require('../handlers/tempshandler')
const { API_KEY } = process.env;

const router = Router();

router.get('/temperaments', async(req, res) => {
    try{
        const temp = await tempsHandler();
        res.status(202).json(temp);
    }catch(error){
        res.status(404).json({error: error.message})
    }
})

router.get("/dogs", async (req, res) => {
    const name = req.query.name; //guarda el 'name' requeridos por query
    try{
    const totalDogs = await allDogsControllers(name); //guarda toda la info en totalDogs

    if(name) {
        const dogName = totalDogs.filter(
            (
                el //filtra en totalDogs el elemento pasado por params
            ) => el.name.toLowerCase().includes(name.toLowerCase())
        );
        dogName.length //si hay algo en dogName
        ? res.status(200).json(dogName) //lo consologuea en 200
        : res.status(400) //si no hay lo manda en 400
            .send('Lo siento no tengo perros con ese nombre');
    }else{
        res.status(200).json(totalDogs); //y si no, los manda todos
    }
    }catch(error){
        res.status(404).json({error: error.message});
    }
});




router.get("/dogs/:id", async (req, res) => {
    let {id} = req.params

    try{
        if(id.length > 5) {
            let dbDogs = await dbDogId(id)
            return res.status(200).json(dbDogs)
        }
        let foundDog = await getDog(id)
        return res.status(200).json(foundDog)
    }
    catch(error) {
        res.status(404).json({error: error.message})
    }
});



module.exports = router;