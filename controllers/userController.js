const CustomError = require("../errors/CustomError");
const userService = require("../services/userService");

const login = async (req, res) => {
    try {
        const user = await userService.login(req.body);

        res.status(200).json(user);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);
    }
}

const data = async (req, res) => {
    try {
        const token = req.header("Authorization");

        const user = await userService.data(token);

        res.status(200).json(user);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);
    }
}

const registrar = async (req, res) => {
    try {
        const user = await userService.registrar(req.body);
        
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);
    }
}

const alterImg = async (req, res) => {
    try {
        const user = await userService.alterImg(req.header("Authorization"), req.body);

        res.status(200).json(user);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);   
    }
}

const update = async (req, res) => {
    try {
        const user = await userService.update(req.header("Authorization"), req.body);

        res.status(200).json("Updated sucessfully");
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);
    }
}

module.exports = { login, data, update, registrar, alterImg }