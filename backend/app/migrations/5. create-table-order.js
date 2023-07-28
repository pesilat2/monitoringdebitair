/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deviceId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  },
};

// id: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     primaryKey: true,
//   },
//   userId: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   deviceId: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   quantity: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   totalPrice: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
