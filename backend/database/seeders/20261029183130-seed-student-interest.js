'use strict';

const NATIONAL_IDS = ['45123456D', '78654321W'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Depends on the student seeder.
    const students = await queryInterface.sequelize.query(
      'SELECT id, national_id FROM students WHERE national_id IN (:ids)',
      {
        replacements: { ids: NATIONAL_IDS },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const studentId = Object.fromEntries(students.map((s) => [s.national_id, s.id]));

    await queryInterface.bulkInsert('student_interests', [
      { student_id: studentId['45123456D'], name: 'Desarrollo frontend', description: 'Wants to work on web interfaces with React' },
      { student_id: studentId['45123456D'], name: 'Diseño UX/UI', description: 'Interested in usability and interface design' },
      { student_id: studentId['45123456D'], name: 'Teletrabajo', description: 'Prefers remote or hybrid positions' },
      { student_id: studentId['78654321W'], name: 'Administración de sistemas', description: 'Servers, networks and infrastructure' },
      { student_id: studentId['78654321W'], name: 'Ciberseguridad', description: 'Would like to specialise in security' },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const students = await queryInterface.sequelize.query(
      'SELECT id FROM students WHERE national_id IN (:ids)',
      {
        replacements: { ids: NATIONAL_IDS },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    await queryInterface.bulkDelete('student_interests', {
      student_id: students.map((s) => s.id),
    }, {});
  }
};
