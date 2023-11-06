const CustomError = require("../errors/CustomError");
const userService = require("../services/userService");

const login = async (req, res) => {
    try {
        const token = await userService.login(req.body);

        res.status(200).cookie("token", token).send("Logado com sucesso");
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
        const { token } = req.cookies;

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
        const token = await userService.registrar(req.body);
        
        res.status(201).cookie("token", token).send("Registrado com sucesso");
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
        const { token } = req.cookies;

        const user = await userService.alterImg(token, req.body);
        
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
        const { token } = req.cookies;

        const user = await userService.update(token, req.body);

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
        const { token } = req.cookies;

        const spent = await userService.calculateSpent(token);

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