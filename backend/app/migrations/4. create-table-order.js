/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      deviceId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Devices',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      amount_of_water: {
        allowNull: false,
        defaultValue: 0, // in litres of water per day (1 liter is equal to
        type: Sequelize.INTEGER,
      },
      total_cost: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
