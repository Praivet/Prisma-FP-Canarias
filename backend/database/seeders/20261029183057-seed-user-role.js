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
            'student@prismafp.test',
            'locked@prismafp.test',
          ],
        },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const roles = await queryInterface.sequelize.query(
      'SELECT id, name FROM roles WHERE name IN (:names)',
      {
        replacements: { names: ['ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const userId = Object.fromEntries(users.map((u) => [u.email, u.id]));
    const roleId = Object.fromEntries(roles.map((r) => [r.name, r.id]));

    await queryInterface.bulkInsert('user_roles', [
      { user_id: userId['admin@prismafp.test'], role_id: roleId.ADMIN, assigned_at: now },
      { user_id: userId['coordinator@prismafp.test'], role_id: roleId.COORDINATOR, assigned_at: now },
      { user_id: userId['coordinator@prismafp.test'], role_id: roleId.TEACHER, assigned_at: now },
      { user_id: userId['teacher@prismafp.test'], role_id: roleId.TEACHER, assigned_at: now },
      { user_id: userId['student@prismafp.test'], role_id: roleId.STUDENT, assigned_at: now },
      { user_id: userId['locked@prismafp.test'], role_id: roleId.STUDENT, assigned_at: now },
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
            'student@prismafp.test',
            'locked@prismafp.test',
          ],
        },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    await queryInterface.bulkDelete('user_roles', {
      user_id: users.map((u) => u.id),
    }, {});
  }
};