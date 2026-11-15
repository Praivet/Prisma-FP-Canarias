'use strict';

const TUTOR_EMAILS = ['teacher@prismafp.test', 'coordinator@prismafp.test'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Depends on the user, training-program and academic-year seeders.
    // Tutors are users with the TEACHER role (see the user-role seeder).
    const users = await queryInterface.sequelize.query(
      'SELECT id, email FROM users WHERE email IN (:emails)',
      {
        replacements: { emails: TUTOR_EMAILS },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const programs = await queryInterface.sequelize.query(
      'SELECT id, code FROM training_programs WHERE code IN (:codes)',
      {
        replacements: { codes: ['IFC-DAW', 'IFC-DAM', 'IFC-ASIR', 'IFC-SMR'] },
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

    const userId = Object.fromEntries(users.map((u) => [u.email, u.id]));
    const programId = Object.fromEntries(programs.map((p) => [p.code, p.id]));
    const yearId = Object.fromEntries(years.map((y) => [y.name, y.id]));

    await queryInterface.bulkInsert('tutor_assignments', [
      { tutor_id: userId['coordinator@prismafp.test'], program_id: programId['IFC-SMR'], academic_year_id: yearId['2024-2025'], assigned_at: new Date('2024-09-02') },
      { tutor_id: userId['teacher@prismafp.test'], program_id: programId['IFC-DAW'], academic_year_id: yearId['2025-2026'], assigned_at: new Date('2025-09-01') },
      { tutor_id: userId['teacher@prismafp.test'], program_id: programId['IFC-DAW'], academic_year_id: yearId['2026-2027'], assigned_at: new Date('2026-09-07') },
      { tutor_id: userId['teacher@prismafp.test'], program_id: programId['IFC-DAM'], academic_year_id: yearId['2026-2027'], assigned_at: new Date('2026-09-07') },
      { tutor_id: userId['coordinator@prismafp.test'], program_id: programId['IFC-ASIR'], academic_year_id: yearId['2026-2027'], assigned_at: new Date('2026-09-07') },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM users WHERE email IN (:emails)',
      {
        replacements: { emails: TUTOR_EMAILS },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    await queryInterface.bulkDelete('tutor_assignments', {
      tutor_id: users.map((u) => u.id),
    }, {});
  }
};
