'use strict';

const crypto = require('crypto');

const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');

const TOKENS = {
  adminRefresh: sha256('seed-admin-refresh-token'),
  teacherReset: sha256('seed-teacher-password-reset-token'),
  studentVerification: sha256('seed-student-email-verification-token'),
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const inDays = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    const users = await queryInterface.sequelize.query(
      'SELECT id, email FROM users WHERE email IN (:emails)',
      {
        replacements: {
          emails: ['admin@prismafp.test', 'teacher@prismafp.test', 'student@prismafp.test'],
        },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const userId = Object.fromEntries(users.map((u) => [u.email, u.id]));

    await queryInterface.bulkInsert('auth_tokens', [
      {
        user_id: userId['admin@prismafp.test'],
        token_hash: TOKENS.adminRefresh,
        token_type: 'REFRESH',
        expires_at: inDays(7),
        used_at: null,
        created_at: now,
      },
      {
        user_id: userId['teacher@prismafp.test'],
        token_hash: TOKENS.teacherReset,
        token_type: 'PASSWORD_RESET',
        expires_at: inDays(1),
        used_at: now,
        created_at: now,
      },
      {
        user_id: userId['student@prismafp.test'],
        token_hash: TOKENS.studentVerification,
        token_type: 'EMAIL_VERIFICATION',
        expires_at: inDays(2),
        used_at: null,
        created_at: now,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('auth_tokens', {
      token_hash: Object.values(TOKENS),
    }, {});
  }
};