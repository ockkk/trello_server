'use strict'

module.exports = (sequelize, DataTypes) => {
  const containers = sequelize.define('containers', {
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
    models.containers.hasMany(models.cards, {
     foreignKey: "ct_key",
     onDelete: "cascade"
    });
 }

  return containers;
}