const express = require("express");
const jwt = require("jsonwebtoken");

/* const { verificarAutenticacao } = require("../middlewares/middleware"); */

const router = express.Router();

router.get("/verificar-autenticacao/", (req, res) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, 'secreto', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido  " });
        }

        return res.status(200).json({ permission: true });
    })
});

router.post("/login", (req, res) => {
    const username = "sadmag"
    const password = "123jacare"

    if (username === "sadmag" && password === "123jacare") {
        const token = jwt.sign({ username }, 'secreto', { expiresIn: '1h' });
        res.json({ token });
    }
    else {
        res.status(401).json({ message: 'Autenticação falhou' })
    }
});

module.exports = { router }