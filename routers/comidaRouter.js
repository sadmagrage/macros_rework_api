const bodyParser = require("body-parser");
const express = require("express");

const controller = require("../controllers/comidaController");

const router = express.Router();

router.use(bodyParser.json());

router.get("/", controller.findAll);

router.get("/:comida_id", controller.findOne);

router.post("/", controller.save);

module.exports = { router };