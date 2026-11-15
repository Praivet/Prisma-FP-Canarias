'use strict';

const NATIONAL_IDS = ['45123456D', '78654321W'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    // Depends on the student-enrollment and company seeders.
    // An enrollment is identified by student + program + academic year, so the key joins the three.
    const enrollments = await queryInterface.sequelize.query(
      `SELECT se.id, s.national_id, tp.code, ay.name
       FROM student_enrollments se
       JOIN students s ON s.id = se.student_id
       JOIN training_programs tp ON tp.id = se.program_id
       JOIN academic_years ay ON ay.id = se.academic_year_id
       WHERE s.national_id IN (:ids)`,
      {
        replacements: { ids: NATIONAL_IDS },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const companies = await queryInterface.sequelize.query(
      'SELECT id, tax_id FROM companies WHERE tax_id IN (:taxIds)',
      {
        replacements: { taxIds: ['B35123456', 'B38234567'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const enrollmentId = Object.fromEntries(enrollments.map((e) => [`${e.national_id}|${e.code}|${e.name}`, e.id]));
    const companyId = Object.fromEntries(companies.map((c) => [c.tax_id, c.id]));

    await queryInterface.bulkInsert('internships', [
      // Pablo: SMR internship, he was hired by the company afterwards.
      {
        enrollment_id: enrollmentId['78654321W|IFC-SMR|2024-2025'],
        company_id: companyId.B38234567,
        start_date: new Date('2025-03-17'),
        end_date: new Date('2025-06-06'),
        was_hired: true,
        hiring_date: new Date('2025-07-01'),
        created_at: now,
        updated_at: now,
      },
      // Ana: DAW internship in progress during her second year.
      {
        enrollment_id: enrollmentId['45123456D|IFC-DAW|2026-2027'],
        company_id: companyId.B35123456,
        start_date: new Date('2026-10-05'),
        end_date: null,
        was_hired: false,
        hiring_date: null,
        created_at: now,
        updated_at: now,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const enrollments = await queryInterface.sequelize.query(
      `SELECT se.id FROM student_enrollments se
       JOIN students s ON s.id = se.student_id
       WHERE s.national_id IN (:ids)`,
      {
        replacements: { ids: NATIONAL_IDS },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    await queryInterface.bulkDelete('internships', {
      enrollment_id: enrollments.map((e) => e.id),
    }, {});
  }
};
