const bodyParser = require("body-parser");
const express = require("express");

const { login, data, registrar, update, alterImg, calculateSpent, permission } = require("../controllers/userController")

const router = express.Router();

router.use(bodyParser.json());

router.post("/login", login);

router.get("/data", data);

router.post("/update", update);

router.post("/alter_img", alterImg);

router.post("/registrar", registrar);

router.get("/calculate", calculateSpent);

router.get("/permission", permission);

module.exports = { router }