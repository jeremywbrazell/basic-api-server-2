"use strict";

const Food = (sequelize, DataTypes) =>
  sequelize.define("Food", {
    foodName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cuisine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

module.exports = Food;