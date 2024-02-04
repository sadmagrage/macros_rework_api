const { DataTypes } = require("sequelize");

const { sequelize } = require("../configs/sequelize");

const Comida = sequelize.define("new_comida", {
    comidaId: {
        type: DataTypes.CHAR(36),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    carb: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
    protl: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
    proth: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
    fat: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
    image: {
        type: DataTypes.BLOB("long")
    }
});

module.exports = Comida;