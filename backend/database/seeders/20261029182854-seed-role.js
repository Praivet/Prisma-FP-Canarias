"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [{
      id: 1,
      name: 'ADMIN',
      description: 'Full access to the whole platform'
    },{
      id: 2,
      name: 'COORDINATOR',
      description: 'Management team (Directivo): companies, graduate surveys and reports'
    },{
      id: 3,
      name: 'TEACHER',
      description: 'Tutor: manages the students of their assigned programmes'
    },{
      id: 4,
      name: 'STUDENT',
      description: 'Student who answers surveys'
    }], {});

    // Synchronize PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
            SELECT setval(
              pg_get_serial_sequence('public.roles', 'id'),
              COALESCE((SELECT MAX(id) FROM public.roles), 0) + 1,
              false
            );
          `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', { id: [1, 2, 3, 4] });
  }
};
