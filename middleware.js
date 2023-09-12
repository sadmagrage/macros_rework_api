const jwt = require("jsonwebtoken");

const verificarAutenticacao = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, 'secreto', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido  " });
        }

        req.usuario = decoded.username;
        next();
    })
};

module.exports = { verificarAutenticacao }