const bodyParser = require("body-parser");
const express = require("express");
const multer = require("multer");

const { login, registrar, update, alterImg, calculateSpent, permission, teste } = require("../controllers/userController");

const router = express.Router();

router.use(bodyParser.json());

router.post("/login", login);

router.post("/update", update);

router.post("/alter_img", multer().single("img"), alterImg);

router.post("/registrar", registrar);

router.get("/calculate", calculateSpent);

router.get("/permission", permission);

module.exports = { router }