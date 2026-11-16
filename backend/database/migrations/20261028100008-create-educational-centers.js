'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('educational_centers', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      name: { type: Sequelize.STRING(255), allowNull: false },
      code: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      logo_url: { type: Sequelize.STRING(500), allowNull: true },
      address: { type: Sequelize.STRING(255), allowNull: true },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('educational_centers');
  }
};
