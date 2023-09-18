const bodyParser = require("body-parser");
const express = require("express");

const controller = require("../controllers/comidaController");

const router = express.Router();

router.use(bodyParser.json());

router.get("/", controller.findAll);

router.get("/:comida_id", controller.findOne);

router.post("/", controller.save);

/* const Comida = require("../models/ComidaModel");
router.delete("/delete", async (req, res) => {
    const data = await Comida.findAll();

    data.map(async item => {
        await item.destroy();
    })
    const newData = await Comida.findAll();
    res.json(newData);
}); */

module.exports = { router };