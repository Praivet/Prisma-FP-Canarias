'use strict';

const crypto = require('crypto');

const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');

const TOKENS = {
  pabloEmployment: sha256('seed-pablo-employment-survey-token'),
  anaEmployment: sha256('seed-ana-employment-survey-token'),
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const inDays = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    // Depends on the survey and student seeders.
    const surveys = await queryInterface.sequelize.query(
      'SELECT id, title FROM surveys WHERE title IN (:titles)',
      {
        replacements: { titles: ['Encuesta de inserción laboral'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const students = await queryInterface.sequelize.query(
      'SELECT id, national_id FROM students WHERE national_id IN (:ids)',
      {
        replacements: { ids: ['45123456D', '78654321W'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const surveyId = Object.fromEntries(surveys.map((s) => [s.title, s.id]));
    const studentId = Object.fromEntries(students.map((s) => [s.national_id, s.id]));

    await queryInterface.bulkInsert('survey_invitations', [
      // Pablo: already completed the survey (see the survey-answer seeder).
      {
        survey_id: surveyId['Encuesta de inserción laboral'],
        student_id: studentId['78654321W'],
        token_hash: TOKENS.pabloEmployment,
        sent_at: new Date('2026-01-12'),
        expires_at: new Date('2026-02-12'),
        completed_at: new Date('2026-01-15'),
        created_at: now,
        updated_at: now,
      },
      // Ana: pending invitation, still valid.
      {
        survey_id: surveyId['Encuesta de inserción laboral'],
        student_id: studentId['45123456D'],
        token_hash: TOKENS.anaEmployment,
        sent_at: now,
        expires_at: inDays(30),
        completed_at: null,
        created_at: now,
        updated_at: now,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('survey_invitations', {
      token_hash: Object.values(TOKENS),
    }, {});
  }
};
