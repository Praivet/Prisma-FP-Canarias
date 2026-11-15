'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    // Depends on the user seeder: every student is linked to a user (1:1).
    const users = await queryInterface.sequelize.query(
      'SELECT id, email FROM users WHERE email IN (:emails)',
      {
        replacements: { emails: ['student@prismafp.test', 'locked@prismafp.test'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const userId = Object.fromEntries(users.map((u) => [u.email, u.id]));

    await queryInterface.bulkInsert('students', [
      {
        user_id: userId['student@prismafp.test'],
        national_id: '45123456D',
        first_name: 'Ana',
        last_name: 'Pérez Medina',
        email: 'student@prismafp.test',
        phone: '628123456',
        birth_date: new Date('2004-03-15'),
        created_at: now,
        updated_at: now,
      },
      {
        user_id: userId['locked@prismafp.test'],
        national_id: '78654321W',
        first_name: 'Pablo',
        last_name: 'Suárez Quintana',
        email: 'locked@prismafp.test',
        phone: null,
        birth_date: new Date('2002-11-02'),
        created_at: now,
        updated_at: now,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('students', {
      national_id: ['45123456D', '78654321W'],
    }, {});
  }
};
