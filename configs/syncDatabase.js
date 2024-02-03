const { sequelize } = require("./sequelize");

const syncDatabase = () => new Promise((resolve, reject) => sequelize.sync().then(resolve));

module.exports = syncDatabase;