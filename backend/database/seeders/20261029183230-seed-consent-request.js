'use strict';

const crypto = require('crypto');

const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');

const TOKENS = {
  anaRequest: sha256('seed-ana-consent-request-token'),
  pabloRequest: sha256('seed-pablo-consent-request-token'),
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    // Depends on the student and user seeders: the coordinator sends the requests.
    const students = await queryInterface.sequelize.query(
      'SELECT id, national_id FROM students WHERE national_id IN (:ids)',
      {
        replacements: { ids: ['45123456D', '78654321W'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const users = await queryInterface.sequelize.query(
      'SELECT id, email FROM users WHERE email IN (:emails)',
      {
        replacements: { emails: ['coordinator@prismafp.test'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const studentId = Object.fromEntries(students.map((s) => [s.national_id, s.id]));
    const userId = Object.fromEntries(users.map((u) => [u.email, u.id]));

    await queryInterface.bulkInsert('consent_requests', [
      // Ana: already answered (used_at set).
      {
        student_id: studentId['45123456D'],
        sent_by_id: userId['coordinator@prismafp.test'],
        token_hash: TOKENS.anaRequest,
        sent_at: new Date('2026-09-20'),
        expires_at: new Date('2026-10-20'),
        used_at: new Date('2026-09-22'),
        created_at: now,
        updated_at: now,
      },
      // Pablo: answered too, so his consents can reference this request.
      {
        student_id: studentId['78654321W'],
        sent_by_id: userId['coordinator@prismafp.test'],
        token_hash: TOKENS.pabloRequest,
        sent_at: new Date('2025-06-25'),
        expires_at: new Date('2025-07-25'),
        used_at: new Date('2025-06-27'),
        created_at: now,
        updated_at: now,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('consent_requests', {
      token_hash: Object.values(TOKENS),
    }, {});
  }
};
