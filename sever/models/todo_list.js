'use strict'

module.exports = (sequelize, DataTypes) => {
  const todo_list = sequelize.define('todo_list', {
    t_key: {
      type: DataTypes.INTERGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    t_board: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    t_category: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    t_card: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  })   
  return todo_list;
}