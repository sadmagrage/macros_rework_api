const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/UserModel");
const CustomError = require("../errors/CustomError");
const calculateSpentFunction = require("../utils/calculateSpent");
const UserImg = require("../models/UserImgModel");
require("../configs/mongoose");

const login = async (userDto) => {
    const user = await User.findOne({ where: { username: userDto.username } });

    const access = await bcrypt.compare(userDto.password, user.password);

    const userImg = await UserImg.findOne({ '_id': user.user_id });

    delete user.password;

    if (access) {
        const token = jwt.sign({ data: user }, process.env.SEGREDO, { expiresIn: "30min" });

        return { token, "userImg": userImg.user_img };
    }
    else {
        throw new CustomError("Wrong credentials", 401);
    }
}

const update = async (token, userDto) => {
    const data = jwt.verify(token, process.env.SEGREDO).data;

    const user = await User.findOne({ where: { username: data.username } });
    
    Object.keys(userDto).map(item => {
        user[item] = userDto[item];
    });

    await user.save();

    return user;
};

const alterImg = async (token, userImage) => {
    const data = jwt.verify(token, process.env.SEGREDO).data;

    //const user = await User.findOne({ where: { username: data.username } });

    const userImgExists = await UserImg.findOne({ "_id": data.user_id });

    let userImg = null;

    if (userImgExists == undefined) {
        userImg = await UserImg.create({ _id: data.user_id, user_img: userImage.buffer });
    }
    else {
        userImg = await UserImg.findOneAndUpdate({ "_id": data.user_id }, { _id: data.user_id ,user_img: userImage.buffer }, { new: true });
    }

    data["img"] = userImg.user_img;

    const newToken = jwt.sign({ "data": data }, process.env.SEGREDO, { expiresIn: "30min" });

    return newToken;
};

const registrar = async (userDto) => {
    const usernameExists = await User.findOne({ where: { username: userDto.username } });

    if (usernameExists) throw new CustomError("Username already exists", 409);

    const getHash = await bcrypt.hash(userDto.password, 12);
    
    userDto["hashPassword"] = getHash;

    const user = User.build({ username: userDto.username, password: userDto.hashPassword });

    await user.save();

    const token = jwt.sign({ data: user }, process.env.SEGREDO, { expiresIn: "30min" });

    return token;
}

const calculateSpent = async (token) => {
    const data = jwt.verify(token, process.env.SEGREDO).data;

    const user = await User.findOne({ where: { username: data.username } });

    const spent = calculateSpentFunction(user);

    return spent
};

const permission = () => {
    return { "permission": true };
}

module.exports = { login, update, registrar, alterImg, calculateSpent, permission }