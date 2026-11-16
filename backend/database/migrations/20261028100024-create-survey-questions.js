'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('survey_questions', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      survey_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'surveys', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      question_text: { type: Sequelize.STRING(500), allowNull: false },
      question_type: { type: Sequelize.ENUM('text', 'number', 'scale', 'boolean'), allowNull: false },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
      is_required: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('survey_questions');
    // PostgreSQL keeps the ENUM type after dropping the table.
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_survey_questions_question_type";');
  }
};
