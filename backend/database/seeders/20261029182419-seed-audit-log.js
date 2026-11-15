'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    const users = await queryInterface.sequelize.query(
      'SELECT id, email FROM users WHERE email IN (:emails)',
      {
        replacements: {
          emails: [
            'admin@prismafp.test',
            'coordinator@prismafp.test',
            'teacher@prismafp.test',
            'locked@prismafp.test',
          ],
        },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const userId = Object.fromEntries(users.map((u) => [u.email, u.id]));

    await queryInterface.bulkInsert('audit_logs', [
      {
        user_id: userId['admin@prismafp.test'],
        action: 'CREATE',
        entity_type: 'User',
        entity_id: String(userId['coordinator@prismafp.test']),
        previous_values: null,
        new_values: JSON.stringify({ email: 'coordinator@prismafp.test', isActive: true }),
        created_at: now,
      },
      {
        user_id: userId['admin@prismafp.test'],
        action: 'UPDATE',
        entity_type: 'User',
        entity_id: String(userId['locked@prismafp.test']),
        previous_values: JSON.stringify({ failedLoginAttempts: 4 }),
        new_values: JSON.stringify({ failedLoginAttempts: 5 }),
        created_at: now,
      },
      {
        user_id: userId['teacher@prismafp.test'],
        action: 'LOGIN',
        entity_type: 'User',
        entity_id: String(userId['teacher@prismafp.test']),
        previous_values: null,
        new_values: null,
        created_at: now,
      },
      {
        user_id: userId['coordinator@prismafp.test'],
        action: 'LOGIN',
        entity_type: 'User',
        entity_id: String(userId['coordinator@prismafp.test']),
        previous_values: null,
        new_values: null,
        created_at: now,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM users WHERE email IN (:emails)',
      {
        replacements: {
          emails: [
            'admin@prismafp.test',
            'coordinator@prismafp.test',
            'teacher@prismafp.test',
            'locked@prismafp.test',
          ],
        },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    await queryInterface.bulkDelete('audit_logs', {
      user_id: users.map((u) => u.id),
    }, {});
  }
};