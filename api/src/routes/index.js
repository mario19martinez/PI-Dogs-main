const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDogs = require("./getDogs");
const postDogs = require("./postDogs");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", getDogs);
router.use("/", postDogs)

module.exports = router;
