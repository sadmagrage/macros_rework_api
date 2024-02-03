const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/UserModel");
const CustomError = require("../errors/CustomError");
const calculateSpentFunction = require("../utils/calculateSpent");

const login = async userDto => {
    const user = await User.findOne({ where: { username: userDto.username }, attributes: { exclude: ["image"] } });

    const { image: userImg } = user ? user : { image: null } ;

    if (!user) throw new CustomError("Wrong credentials", 401);

    const access = await bcrypt.compare(userDto.password, user.password);

    delete user.password;

    if (access) {
        const token = jwt.sign({ data: user }, process.env.SEGREDO, { expiresIn: "30min" });

        return { token, userImg };
    }
    else {
        throw new CustomError("Wrong credentials", 401);
    }
}

const updateData = async (token, userDto) => {
    const { data } = jwt.verify(token, process.env.SEGREDO);

    const userExists = await User.findOne({ where: { username: data.username } });

    if (!userExists) throw new CustomError("User not exists", 404);

    await User.update(userDto, { where: { userId: data.userId } });

    const updatedUser = await User.findOne({ where: { userId: data.userId } });

    delete updatedUser.password;

    const newToken = jwt.sign({ data: updatedUser }, process.env.SEGREDO, { expiresIn: "30min" });

    return newToken;
};

const getUserImage = async token => {
    console.log(token);
    const { username } = jwt.verify(token, process.env.SEGREDO).data;

    const { image } = await User.findOne({ where: { username }, attributes: ['image'] });

    return image;
};

const updateImage = async (token, userImage) => {
    const { userId } = jwt.verify(token, process.env.SEGREDO).data;

    //const userImgExists = await UserImg.findOne({ "_id": user_id });
    const userExists = await User.findOne({ where: { userId }, attributes: ["userId"] });

    if (!userExists) throw new CustomError("User not found", 404);

    await User.update({ image: userImage.buffer }, { where: { userId } });

    return userImage;
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

const calculateSpent = token => {
    const { data } = jwt.verify(token, process.env.SEGREDO);

    const spent = calculateSpentFunction(data);

    return spent
};

const permission = () => {
    return { "permission": true };
}

module.exports = { login, updateData, registrar, updateImage, calculateSpent, permission, getUserImage }