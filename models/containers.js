'use strict'

module.exports = (sequelize, DataTypes) => {
  const containers = sequelize.define('containers', {
    ct_key: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ct_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  })
  
  containers.associate = function(models){
    models.containers.hasMany(models.cards, {
     foreignKey: "ct_key",
     onDelete: "cascade"
    });
 }

  return containers;
}