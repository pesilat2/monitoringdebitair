/* eslint-disable no-unused-vars */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('ADMIN_UTAMA', 'ADMIN_DAERAH', 'USER'),
      defaultValue: 'USER',
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
