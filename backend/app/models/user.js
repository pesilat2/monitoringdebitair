/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const {
  Model,
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Region, {
        foreignKey: 'regionId',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageProfile: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM('ADMIN_UTAMA', 'ADMIN_DAERAH', 'USER'),
      defaultValue: 'USER',
    },
    regionId: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    isMarried: {
      type: DataTypes.BOOLEAN,
    },
    gender: {
      type: DataTypes.ENUM('MALE', 'FEMALE'),
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
