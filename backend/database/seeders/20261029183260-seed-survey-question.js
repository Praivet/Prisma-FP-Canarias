'use strict';

const SURVEY_TITLES = ['Encuesta de inserción laboral', 'Encuesta de satisfacción de prácticas'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    // Depends on the survey seeder.
    const surveys = await queryInterface.sequelize.query(
      'SELECT id, title FROM surveys WHERE title IN (:titles)',
      {
        replacements: { titles: SURVEY_TITLES },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const surveyId = Object.fromEntries(surveys.map((s) => [s.title, s.id]));
    const employment = surveyId['Encuesta de inserción laboral'];
    const satisfaction = surveyId['Encuesta de satisfacción de prácticas'];

    // Question types allowed by the model: text, number, scale, boolean.
    await queryInterface.bulkInsert('survey_questions', [
      { survey_id: employment, question_text: '¿Estás trabajando actualmente?', question_type: 'boolean', sort_order: 1, is_required: true, created_at: now, updated_at: now },
      { survey_id: employment, question_text: '¿Cuántos meses tardaste en encontrar empleo?', question_type: 'number', sort_order: 2, is_required: false, created_at: now, updated_at: now },
      { survey_id: employment, question_text: 'Del 1 al 5, ¿cuánto se relaciona tu trabajo con el ciclo?', question_type: 'scale', sort_order: 3, is_required: true, created_at: now, updated_at: now },
      { survey_id: employment, question_text: '¿Qué mejorarías de la formación recibida?', question_type: 'text', sort_order: 4, is_required: false, created_at: now, updated_at: now },
      { survey_id: satisfaction, question_text: 'Del 1 al 5, valora a tu empresa de prácticas', question_type: 'scale', sort_order: 1, is_required: true, created_at: now, updated_at: now },
      { survey_id: satisfaction, question_text: '¿Recomendarías esta empresa?', question_type: 'boolean', sort_order: 2, is_required: true, created_at: now, updated_at: now },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const surveys = await queryInterface.sequelize.query(
      'SELECT id FROM surveys WHERE title IN (:titles)',
      {
        replacements: { titles: SURVEY_TITLES },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    await queryInterface.bulkDelete('survey_questions', {
      survey_id: surveys.map((s) => s.id),
    }, {});
  }
};
