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

// const sequelize = new Sequelize({
//     host: "localhost",
//     username: "root",
//     password: "root",
//     database: "teste",
//     dialect: "mysql"
// });

module.exports = { sequelize };