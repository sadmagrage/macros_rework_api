const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_URI, {
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true
        }
    },
    define: {
        underscored: true,
        underscoredAll: true
    }
});

module.exports = { sequelize };