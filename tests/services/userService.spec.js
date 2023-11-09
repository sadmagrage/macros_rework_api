const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/UserModel");
const UserImg = require("../../models/UserImgModel");
const userService = require("../../services/userService");

jest.mock("../../models/UserModel", () => ({
    findOne: jest.fn(),
    create: jest.fn()
}));

jest.mock("../../models/UserImgModel", () => ({
    findOne: jest.fn()
}));

jest.mock("bcrypt", () => ({
    compare: jest.fn(),
    hash: jest.fn()
}));

jest.mock("jsonwebtoken", () => ({
    sign: jest.fn()
}));

jest.mock("../../configs/mongoose", () => jest.fn());

describe("userService", () => {
    
    beforeEach(() => jest.clearAllMocks());

    const userLoginMock = {
        username: "username_login",
        password: "password_login"
    }

    const userMock = {
        user_id: "user_id",
        username: "username",
        password: "password",
        peso: 80,
        bodyfat: 10,
        fator_atividade: 1.5,
        deficit: 200,
        superavit: 20,
        adicional: 50,
        estado: "bulking"
    }

    const userImgMock = {
        _id: "_id",
        user_img: { type: "buffer", data: [] }
    }

    test("login", async () => {

        User.findOne.mockResolvedValue(userMock);
        bcrypt.compare.mockResolvedValue(true);
        UserImg.findOne.mockResolvedValue(userImgMock);
        jwt.sign.mockResolvedValue("token");

        const response = await userService.login(userLoginMock);

        userMock["password"] = "password";

        expect(User.findOne).toHaveBeenCalledWith({ where: { username: userLoginMock.username } });
        expect(bcrypt.compare).toHaveBeenCalledWith(userLoginMock.password, userMock.password);
        expect(UserImg.findOne).toHaveBeenCalledWith({ '_id': userMock.user_id });
        expect(jwt.sign).toHaveBeenCalledWith({ data: userMock }, process.env.SEGREDO, { expiresIn: "30min" });
        expect(response.token).not.toBe(undefined);
        expect(response.userImg).not.toBe(undefined);
    });

    test("register", async () => {
        
        User.findOne.mockResolvedValue(undefined);
        bcrypt.hash.mockResolvedValue("hashPassword");
        User.create.mockResolvedValue(userLoginMock);
        jwt.sign.mockReturnValue("token");

        const response = await userService.registrar(userLoginMock);

        expect(User.findOne).toHaveBeenCalledWith({ where: { username: userLoginMock.username } });
        expect(bcrypt.hash).toHaveBeenCalledWith(userLoginMock.password, 12);
        expect(User.create).toHaveBeenCalledWith({ ...userDto });
        expect(jwt.sign).toHaveBeenCalledWith({ data: userLoginMock }, process.env.SEGREDO, { expiresIn: "30min" });
        expect(userLoginMock.password).toBe("hashPassword");
        expect(response).toBe("token");
    });
});