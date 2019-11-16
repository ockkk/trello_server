'use strict'

module.exports = (sequelize, DataTypes) => {
  const cards = sequelize.define('cards', {
    cd_key: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    cd_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  })   
  return cards;
}