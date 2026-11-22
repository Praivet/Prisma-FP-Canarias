'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('examen_audit', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      // FK a companies: cada registro pertenece a una empresa (N:1)
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'companies', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      description: { type: Sequelize.STRING(255), allowNull: false },
      operation: { type: Sequelize.ENUM('CREATE', 'MODIFY', 'READ'), allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('examen_audit');
    // PostgreSQL keeps the ENUM type after dropping the table.
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_examen_audit_operation";');
  }
};
