'use strict'

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    u_key: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    u_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    u_email: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    u_password: {
      type: DataTypes.STRING(30),
      allowNull: false,
    }
  })   
  users.associate = function(models){
     models.users.hasMany(models.todo_list, {
      foreignKey: "u_key",
      onDelete: "cascade"
     });
  }

  return users;
}