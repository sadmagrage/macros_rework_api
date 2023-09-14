const { DataTypes } = require("sequelize");

const { sequelize } = require("../configs/sequelize");

const User = sequelize.define("users", {
    user_id: {
        type: DataTypes.CHAR(36),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    peso: {
        type: DataTypes.TINYINT
    },
    bodyfat: {
        type: DataTypes.TINYINT
    },
    idade: {
        type: DataTypes.TINYINT
    },
    altura: {
        type: DataTypes.SMALLINT
    },
    treino: {
        type: DataTypes.JSON,
        default: '{"domingo": [], "segunda": [], "terca": [], "quarta": [], "quinta": [], "sexta": [], "sabado": []}'
    },
    deficit: {
        type: DataTypes.SMALLINT
    },
    superavit: {
        type: DataTypes.TINYINT
    },
    estado: {
        type: DataTypes.ENUM("bulking", "cutting", "manutencao")
    },
    img: {
        type: DataTypes.STRING
    }
});

module.exports = User;