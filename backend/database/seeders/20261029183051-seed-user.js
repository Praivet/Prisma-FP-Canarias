'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const inOneHour = new Date(Date.now() + 60 * 60 * 1000);
    // Password of every seeded user: Password123!
    const passwordHash = '$2b$10$qoNYl2RIGWmRGjL0aC7Plep.liqDVGtOVQjgbJ9/PAy/aeGJCwg6C';

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        email: 'admin@prismafp.test',
        password_hash: passwordHash,
        first_name: 'Admin',
        last_name: 'Prisma',
        is_active: true,
        failed_login_attempts: 0,
        locked_until: null,
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        email: 'coordinator@prismafp.test',
        password_hash: passwordHash,
        first_name: 'Carmen',
        last_name: 'Rodríguez Santana',
        is_active: true,
        failed_login_attempts: 0,
        locked_until: null,
        created_at: now,
        updated_at: now,
      },
      {
        id: 3,
        email: 'teacher@prismafp.test',
        password_hash: passwordHash,
        first_name: 'Javier',
        last_name: 'Hernández Díaz',
        is_active: true,
        failed_login_attempts: 0,
        locked_until: null,
        created_at: now,
        updated_at: now,
      },
      {
        id: 4,
        email: 'student@prismafp.test',
        password_hash: passwordHash,
        first_name: 'Ana',
        last_name: 'Pérez Medina',
        is_active: true,
        failed_login_attempts: 0,
        locked_until: null,
        created_at: now,
        updated_at: now,
      },
      {
        id: 5,
        email: 'locked@prismafp.test',
        password_hash: passwordHash,
        first_name: 'Pablo',
        last_name: 'Suárez Quintana',
        is_active: true,
        failed_login_attempts: 5,
        locked_until: inOneHour,
        created_at: now,
        updated_at: now,
      },
    ], {});

    // Synchronize PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
            SELECT setval(
              pg_get_serial_sequence('public.users', 'id'),
              COALESCE((SELECT MAX(id) FROM public.users), 0) + 1,
              false
            );
          `);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: [
        'admin@prismafp.test',
        'coordinator@prismafp.test',
        'teacher@prismafp.test',
        'student@prismafp.test',
        'locked@prismafp.test',
      ],
    }, {});
  }
};