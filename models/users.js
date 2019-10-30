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
      vaildate: {
        isEmail: true 
      }
    },
    u_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slat: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })   
  users.associate = function(models){
     models.users.hasMany(models.boards, {
      foreignKey: "u_key",
      onDelete: "cascade"
     });
  }
  return users;
}
