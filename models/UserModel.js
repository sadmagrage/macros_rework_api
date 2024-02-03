const { DataTypes } = require("sequelize");

const { sequelize } = require("../configs/sequelize");

const User = sequelize.define("user_macros", {
    userId: {
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
    image: {
        type: DataTypes.BLOB("long")
    },
    peso: {
        type: DataTypes.TINYINT
    },
    bodyfat: {
        type: DataTypes.TINYINT
    },
    fatorAtividade: {
        type: DataTypes.FLOAT,
        defaultValue: 1.3
    },
    deficit: {
        type: DataTypes.SMALLINT
    },
    superavit: {
        type: DataTypes.TINYINT
    },
    adicional: {
        type: DataTypes.SMALLINT
    },
    estado: {
        type: DataTypes.ENUM("bulking", "cutting", "manutencao")
    }
});

module.exports = User;