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
        const token = req.cookies.token;

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
        console.log(error.message)
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);
    }
}

const alterImg = async (req, res) => {
    try {
        const user = await userService.alterImg(req.cookies.token, req.body);
        
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
        const user = await userService.update(req.cookies.token, req.body);

        res.status(200).json("Updated sucessfully");
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);
    }
}

const calculateSpent = async (req, res) => {
    try {
        const spent = await userService.calculateSpent(req.cookies.token);

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

module.exports = { login, data, update, registrar, alterImg, calculateSpent, permission }