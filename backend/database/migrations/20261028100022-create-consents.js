'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('consents', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'students', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      consent_request_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'consent_requests', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      purpose: { type: Sequelize.STRING(100), allowNull: false },
      status: { type: Sequelize.ENUM('granted', 'denied', 'revoked'), allowNull: false },
      policy_version: { type: Sequelize.STRING(20), allowNull: false },
      recorded_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('consents');
    // PostgreSQL keeps the ENUM type after dropping the table.
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_consents_status";');
  }
};
