module.exports = (sequelize, DataTypes) => {
  return sequelize.define('users', {
    u_key: {
      type: DataTypes.INTERGER,
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
}