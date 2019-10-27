'use strict'

module.exports = (sequelize, DataTypes) => {
  const todo_list = sequelize.define('todo_list', {
    t_key: {
      type: DataTypes.INTERGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    t_type: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  })   
  return todo_list;
}