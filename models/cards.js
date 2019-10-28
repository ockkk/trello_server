'use strict'

module.exports = (sequelize, DataTypes) => {
  const cards = sequelize.define('cards', {
    b_key: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    b_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  })   
  return cards;
}