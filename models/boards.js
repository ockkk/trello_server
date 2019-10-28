'use strict'

module.exports = (sequelize, DataTypes) => {
  const boards = sequelize.define('boards', {
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
  
  users.associate = function(models){
    models.boards.hasMany(models.containers, {
     foreignKey: "b_key",
     onDelete: "cascade"
    });
 }
  return boards;
}