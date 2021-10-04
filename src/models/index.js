"use strict";

require("dotenv").config();

//connect to the database
console.log(process.env.NODE_ENV, process.env.DATABASE_URL)
const DATABASE_URL = process.env.NODE_ENV === "test" ? "sqlite:memory" : process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require('sequelize');
let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }: {};
let sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

const clothesSchema = require("./clothes.js");
const foodSchema = require('./food.js')

module.exports = {
  db: sequelize,
  Clothes: clothesSchema(sequelize, DataTypes),
  Food: foodSchema(sequelize, DataTypes)
};
