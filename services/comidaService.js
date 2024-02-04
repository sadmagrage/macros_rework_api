const Comida = require("../models/ComidaModel");
const jwt = require("jsonwebtoken");
const axios = require("axios").create();

const findAll = async () => {
    const comida = await Comida.findAll({ order: [ ["createdAt", "ASC"] ] });

    return comida;
}

const findOne = async (comidaId) => {
    const comida = await Comida.findOne({ where: { comida_id: comidaId } });

    return comida;
}

const save = async (token, comidaDto) => {
    const { username } = jwt.verify(token, process.env.SEGREDO).data;

    if (username !== "sadmag") return;

    ["carb", "protl", "proth", "fat"].map(item => {
        comidaDto[item] = comidaDto[item]/comidaDto.quantidade;
    });

    const { data: image } = await axios.get(comidaDto.image, { responseType: 'arraybuffer' });

    const comida = await Comida.create({ nome: comidaDto.nome, carb: comidaDto.carb, protl: comidaDto.protl, proth: comidaDto.proth, fat: comidaDto.fat, image });

    return comida;
}

module.exports = { findAll, findOne, save }
