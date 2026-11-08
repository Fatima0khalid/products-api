const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("products_db", "root", "Fa%10%Fa", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

module.exports = sequelize;