'use strict';

const NATIONAL_IDS = ['45123456D', '78654321W'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    // Depends on the student, company and internship seeders.
    const students = await queryInterface.sequelize.query(
      'SELECT id, national_id FROM students WHERE national_id IN (:ids)',
      {
        replacements: { ids: NATIONAL_IDS },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const companies = await queryInterface.sequelize.query(
      'SELECT id, tax_id FROM companies WHERE tax_id IN (:taxIds)',
      {
        replacements: { taxIds: ['B38234567', 'B35456789'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    // The internship that led to the job, found through its enrollment's student.
    const internships = await queryInterface.sequelize.query(
      `SELECT i.id, s.national_id FROM internships i
       JOIN student_enrollments se ON se.id = i.enrollment_id
       JOIN students s ON s.id = se.student_id
       WHERE s.national_id IN (:ids) AND i.was_hired = true`,
      {
        replacements: { ids: NATIONAL_IDS },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const studentId = Object.fromEntries(students.map((s) => [s.national_id, s.id]));
    const companyId = Object.fromEntries(companies.map((c) => [c.tax_id, c.id]));
    const internshipId = Object.fromEntries(internships.map((i) => [i.national_id, i.id]));

    await queryInterface.bulkInsert('employment_records', [
      // Pablo: hired after his internship, related to his studies.
      {
        student_id: studentId['78654321W'],
        company_id: companyId.B38234567,
        internship_id: internshipId['78654321W'],
        position: 'Técnico de soporte y redes',
        sector: 'Telecomunicaciones',
        start_date: new Date('2025-07-01'),
        end_date: null,
        is_related_to_studies: true,
        created_at: now,
        updated_at: now,
      },
      // Ana: summer job not related to her studies and without internship.
      {
        student_id: studentId['45123456D'],
        company_id: companyId.B35456789,
        internship_id: null,
        position: 'Auxiliar administrativa',
        sector: 'Administración',
        start_date: new Date('2025-07-01'),
        end_date: new Date('2025-08-31'),
        is_related_to_studies: false,
        created_at: now,
        updated_at: now,
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

    await queryInterface.bulkDelete('employment_records', {
      student_id: students.map((s) => s.id),
    }, {});
  }
};
