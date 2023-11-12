const bodyParser = require("body-parser");
const express = require("express");
const multer = require("multer");

const { login, registrar, updateData, updateImage, calculateSpent, permission } = require("../controllers/userController");

const router = express.Router();

router.use(bodyParser.json());

router.post("/login", login);

router.put("/", updateData);

router.patch("/", multer().single("img"), updateImage);

router.post("/registrar", registrar);

router.get("/", calculateSpent);

router.get("/permission", permission);

module.exports = { router }