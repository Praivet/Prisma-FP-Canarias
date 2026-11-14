'use strict';

const crypto = require('crypto');

const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');

// Same token as in the survey-invitation seeder, used to find Pablo's invitation.
const PABLO_TOKEN = sha256('seed-pablo-employment-survey-token');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    // Depends on the survey-invitation and survey-question seeders.
    const invitations = await queryInterface.sequelize.query(
      'SELECT id, survey_id FROM survey_invitations WHERE token_hash = :token',
      {
        replacements: { token: PABLO_TOKEN },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const invitation = invitations[0];

    // Questions of the invited survey, keyed by their position in the survey.
    const questions = await queryInterface.sequelize.query(
      'SELECT id, sort_order FROM survey_questions WHERE survey_id = :surveyId',
      {
        replacements: { surveyId: invitation.survey_id },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const questionId = Object.fromEntries(questions.map((q) => [q.sort_order, q.id]));

    // answer_value is TEXT, so every answer is stored as a string.
    const answeredAt = new Date('2026-01-15');
    await queryInterface.bulkInsert('survey_answers', [
      { invitation_id: invitation.id, question_id: questionId[1], answer_value: 'true', answered_at: answeredAt, created_at: now, updated_at: now },
      { invitation_id: invitation.id, question_id: questionId[2], answer_value: '0', answered_at: answeredAt, created_at: now, updated_at: now },
      { invitation_id: invitation.id, question_id: questionId[3], answer_value: '5', answered_at: answeredAt, created_at: now, updated_at: now },
      { invitation_id: invitation.id, question_id: questionId[4], answer_value: 'Más horas de prácticas con redes y Docker', answered_at: answeredAt, created_at: now, updated_at: now },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const invitations = await queryInterface.sequelize.query(
      'SELECT id FROM survey_invitations WHERE token_hash = :token',
      {
        replacements: { token: PABLO_TOKEN },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    await queryInterface.bulkDelete('survey_answers', {
      invitation_id: invitations.map((i) => i.id),
    }, {});
  }
};
