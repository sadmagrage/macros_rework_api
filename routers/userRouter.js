const bodyParser = require("body-parser");
const express = require("express");

const { login, data, registrar, update, alterImg } = require("../controllers/userController")

const router = express.Router();

router.use(bodyParser.json());

router.post("/login", login);

router.get("/data", data);

router.post("/update", update);

router.post("/alter_img", alterImg);

router.post("/registrar", registrar);

module.exports = { router }