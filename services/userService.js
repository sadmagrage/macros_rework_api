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

const updateData = async (token, userDto) => {
    const { data } = jwt.verify(token, process.env.SEGREDO);

    const userExists = await User.findOne({ where: { username: data.username } });

    if (!userExists) throw new CustomError("User not exists", 404);

    await User.update(userDto, { where: { user_id: data.user_id } });

    const updatedUser = await User.findOne({ where: { user_id: data.user_id } });

    delete updatedUser.password;

    const newToken = jwt.sign({ data: updatedUser }, process.env.SEGREDO, { expiresIn: "30min" });

    return newToken;
};

const updateImage = async (token, userImage) => {
    const { user_id } = jwt.verify(token, process.env.SEGREDO).data;

    const userImgExists = await UserImg.findOne({ "_id": user_id });

    let userImg;

    if (userImgExists == undefined) {
        userImg = await UserImg.create({ _id: user_id, user_img: userImage.buffer });
    }
    else {
        userImg = await UserImg.findOneAndUpdate({ "_id": user_id }, { _id: user_id ,user_img: userImage.buffer }, { new: true });
    }

    return userImg.buffer;
};

const registrar = async (userDto) => {
    const usernameExists = await User.findOne({ where: { username: userDto.username } });

    if (usernameExists) throw new CustomError("Username already exists", 409);

    const getHash = await bcrypt.hash(userDto.password, 12);
    
    userDto.password = getHash;

    const user = await User.create({ ...userDto });

    const token = jwt.sign({ data: user }, process.env.SEGREDO, { expiresIn: "30min" });

    return token;
}

const calculateSpent = (token) => {
    const { data } = jwt.verify(token, process.env.SEGREDO);

    const spent = calculateSpentFunction(data);

    return spent
};

const permission = () => {
    return { "permission": true };
}

module.exports = { login, updateData, registrar, updateImage, calculateSpent, permission }