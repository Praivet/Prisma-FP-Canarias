'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('student_enrollments', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'students', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      program_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'training_programs', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      academic_year_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'academic_years', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      enrollment_date: { type: Sequelize.DATEONLY, allowNull: false, defaultValue: Sequelize.literal('CURRENT_DATE') },
      graduation_date: { type: Sequelize.DATEONLY, allowNull: true },
      status: { type: Sequelize.STRING(30), allowNull: false, defaultValue: 'enrolled' },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('student_enrollments');
  }
};
