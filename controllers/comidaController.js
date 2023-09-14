const CustomError = require("../errors/CustomError")
const comidaService = require("../services/comidaService");

const findAll = async (req, res) => {
    try {
        const data = await comidaService.findAll();

        res.status(200).json(data);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
        }
        res.status(500).json(error.message);
    }
}

const findOne = async (req, res) => {
    try {
        const comida = await comidaService.findOne(req.params.comida_id);

        res.status(200).json(comida);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
        }
        res.status(500).json(error.message);        
    }
}

const save = async (req, res) => {
    try {
        const comida = await comidaService.save(req.header("Authorization"), req.body);

        res.status(201).json(comida);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
        }
        res.status(500).json(error.message);        
    }
}

module.exports = { findAll, findOne, save }