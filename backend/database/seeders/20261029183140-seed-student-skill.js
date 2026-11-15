'use strict';

const NATIONAL_IDS = ['45123456D', '78654321W'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    // Depends on the student and skill seeders.
    const students = await queryInterface.sequelize.query(
      'SELECT id, national_id FROM students WHERE national_id IN (:ids)',
      {
        replacements: { ids: NATIONAL_IDS },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const skills = await queryInterface.sequelize.query(
      'SELECT id, name FROM skills',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const studentId = Object.fromEntries(students.map((s) => [s.national_id, s.id]));
    const skillId = Object.fromEntries(skills.map((s) => [s.name, s.id]));

    // Proficiency levels used: basic, intermediate, advanced.
    const skillsByStudent = {
      '45123456D': {
        JavaScript: 'advanced',
        TypeScript: 'intermediate',
        React: 'intermediate',
        SQL: 'intermediate',
        Git: 'advanced',
        'Inglés': 'intermediate',
        'Trabajo en equipo': 'advanced',
      },
      '78654321W': {
        'Redes TCP/IP': 'advanced',
        Docker: 'intermediate',
        SQL: 'basic',
        Git: 'basic',
        'Comunicación': 'intermediate',
      },
    };

    const rows = [];
    for (const [nationalId, levels] of Object.entries(skillsByStudent)) {
      for (const [skillName, level] of Object.entries(levels)) {
        rows.push({
          student_id: studentId[nationalId],
          skill_id: skillId[skillName],
          proficiency_level: level,
          updated_at: now,
        });
      }
    }

    await queryInterface.bulkInsert('student_skills', rows, {});
  },

  async down (queryInterface, Sequelize) {
    const students = await queryInterface.sequelize.query(
      'SELECT id FROM students WHERE national_id IN (:ids)',
      {
        replacements: { ids: NATIONAL_IDS },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    await queryInterface.bulkDelete('student_skills', {
      student_id: students.map((s) => s.id),
    }, {});
  }
};
