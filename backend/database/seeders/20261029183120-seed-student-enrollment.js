'use strict';

const NATIONAL_IDS = ['45123456D', '78654321W'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Depends on the student, training-program and academic-year seeders.
    const students = await queryInterface.sequelize.query(
      'SELECT id, national_id FROM students WHERE national_id IN (:ids)',
      {
        replacements: { ids: NATIONAL_IDS },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const programs = await queryInterface.sequelize.query(
      'SELECT id, code FROM training_programs WHERE code IN (:codes)',
      {
        replacements: { codes: ['IFC-DAW', 'IFC-SMR'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const years = await queryInterface.sequelize.query(
      'SELECT id, name FROM academic_years WHERE name IN (:names)',
      {
        replacements: { names: ['2024-2025', '2025-2026', '2026-2027'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const studentId = Object.fromEntries(students.map((s) => [s.national_id, s.id]));
    const programId = Object.fromEntries(programs.map((p) => [p.code, p.id]));
    const yearId = Object.fromEntries(years.map((y) => [y.name, y.id]));

    await queryInterface.bulkInsert('student_enrollments', [
      // Ana: second year of DAW, currently studying.
      {
        student_id: studentId['45123456D'],
        program_id: programId['IFC-DAW'],
        academic_year_id: yearId['2025-2026'],
        enrollment_date: new Date('2025-09-08'),
        graduation_date: null,
        status: 'enrolled',
      },
      {
        student_id: studentId['45123456D'],
        program_id: programId['IFC-DAW'],
        academic_year_id: yearId['2026-2027'],
        enrollment_date: new Date('2026-09-14'),
        graduation_date: null,
        status: 'enrolled',
      },
      // Pablo: finished SMR and then started DAW, which he dropped.
      {
        student_id: studentId['78654321W'],
        program_id: programId['IFC-SMR'],
        academic_year_id: yearId['2024-2025'],
        enrollment_date: new Date('2024-09-09'),
        graduation_date: new Date('2025-06-20'),
        status: 'graduated',
      },
      {
        student_id: studentId['78654321W'],
        program_id: programId['IFC-DAW'],
        academic_year_id: yearId['2025-2026'],
        enrollment_date: new Date('2025-09-08'),
        graduation_date: null,
        status: 'dropped',
      },
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

    await queryInterface.bulkDelete('student_enrollments', {
      student_id: students.map((s) => s.id),
    }, {});
  }
};
