const CustomError = require("../errors/CustomError");
const userService = require("../services/userService");

const login = async (req, res) => {
    try {
        const token = await userService.login(req.body);

        res.status(200).json(token);
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
        const token = await userService.registrar(req.body);
        
        res.status(201).json(token);
    } catch (error) {
        console.log(error.message)
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);
    }
}

const updateImage = async (req, res) => {
    try {
        const token = req.header("Authorization");

        const buffer = await userService.updateImage(token, req.file);
        
        res.status(200).json(buffer);
    } catch (error) {
        console.log(error)
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);   
    }
}

const updateData = async (req, res) => {
    try {
        const token = req.header("Authorization");

        const newToken = await userService.updateData(token, req.body);

        res.status(200).json(newToken);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);
    }
}

const calculateSpent = (req, res) => {
    try {
        const token = req.header("Authorization");

        const spent = userService.calculateSpent(token);

        res.status(200).json(spent);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);
    }
};

const permission = (req, res) => {
    const permission = userService.permission();

    res.status(200).json(permission);
}

module.exports = { login, updateData, registrar, updateImage, calculateSpent, permission }