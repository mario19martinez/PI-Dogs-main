const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    res.send("Soy el get")
})

module.exports = router;