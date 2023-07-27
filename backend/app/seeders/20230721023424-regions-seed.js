/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Regions', [
      {
        id: 'region-1',
        name: 'Cihampelas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'region-2',
        name: 'Cicalengka',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'region-3',
        name: 'Cicaheum',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Regions', null, {});
  },
};
