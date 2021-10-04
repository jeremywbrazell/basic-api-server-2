"use strict";

const Clothes = (sequelize, DataTypes) =>
  sequelize.define("Clothes", {
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = Clothes;
