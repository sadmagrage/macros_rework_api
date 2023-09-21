const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/UserModel");
const CustomError = require("../errors/CustomError");
const calculateSpentFunction = require("../utils/calculateSpent");

const login = async (userDto) => {
    const user = await User.findOne({ where: { username: userDto.username } });

    const access = await bcrypt.compare(userDto.password, user.password);
    if (access) {
        const token = jwt.sign({ username: user.username }, process.env.SEGREDO, { expiresIn: "1h" });

        return token;
    }
    else {
        throw new CustomError("Wrong credentials", 401);
    }
}

const data = async (token) => {
    const username = await jwt.verify(token, process.env.SEGREDO, (err, decoded) => {
        if (err) throw new CustomError(err.message, 401);
        return decoded.username;
    });
    
    const user = await User.findOne({ where: { username: username }, attributes: [ 'username', 'peso', 'bodyfat', 'idade', 'altura', 'treino', 'deficit', 'superavit', 'adicional', 'estado', 'img' ]});

    if (!user) return "No user found";

    return user;
}

const update = async (token, userDto) => {
    const username = await jwt.verify(token, process.env.SEGREDO, (err, decoded) => {
        if (err) throw new CustomError(err.message, 401);
        return decoded.username;
    });

    const user = await User.findOne({ where: { username: username } });
    
    Object.keys(userDto).map(item => {
        user[item] = userDto[item];
    });

    await user.save();

    return user;
};

const alterImg = async (token, userDto) => {
    const username = await jwt.verify(token, process.env.SEGREDO, (err, decoded) => {
        if (err) throw new CustomError(err.message, 401);
        return decoded.username;
    });

    const user = await User.findOne({ where: { username: username } });

    user.img = userDto.img;
    await user.save();

    return user;
};

const registrar = async (userDto) => {
    const usernameExists = await User.findOne({ where: { username: userDto.username } });

    if (usernameExists) throw new CustomError("Username already exists", 409);

    const getHash = await bcrypt.hash(userDto.password, 12);
    
    userDto["hashPassword"] = getHash;

    const user = User.build({ username: userDto.username, password: userDto.hashPassword, treino: JSON.stringify({"domingo": [], "segunda": [], "terca": [], "quarta": [], "quinta": [], "sexta": [], "sabado": []}) });

    await user.save();

    const token = jwt.sign({ username: user.username }, process.env.SEGREDO, { expiresIn: "1h" });

    return token;
}

const calculateSpent = async (token) => {
    const username = await jwt.verify(token, process.env.SEGREDO, (err, decoded) => {
        if (err) throw new CustomError(err.message, 401);
        return decoded.username;
    });

    const user = await User.findOne({ where: { username: username } });

    const spent = calculateSpentFunction(user);

    return spent
};

module.exports = { login, data, update, registrar, alterImg, calculateSpent }