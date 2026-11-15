'use strict';

// EJEMPLO: tabla intermedia N:M (student_skills) + tabla 1:N (student_interests) para la alumna nueva.
// N:M: cada fila une un alumno con una skill -> necesito el id de LOS DOS lados.
// Para varias skills a la vez: SELECT con IN y Object.fromEntries para tener { Python: 9, Linux: 11 }.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const student = await queryInterface.sequelize.query(
      "SELECT id FROM students WHERE national_id = :nid",
      { replacements: { nid: "12345678Z" }, type: Sequelize.QueryTypes.SELECT }
    );
    const skills = await queryInterface.sequelize.query(
      "SELECT id, name FROM skills WHERE name IN (:names)",
      { replacements: { names: ["Python", "Linux", "Trabajo en equipo"] }, type: Sequelize.QueryTypes.SELECT }
    );
    // [{ id: 9, name: "Python" }, ...]  ->  { Python: 9, ... }
    const skillId = Object.fromEntries(skills.map((s) => [s.name, s.id]));

    // student_skills solo tiene updated_at (mirar la migración 100700 si dudas).
    await queryInterface.bulkInsert("student_skills", [
      { student_id: student[0].id, skill_id: skillId.Python, proficiency_level: "basic", updated_at: now },
      { student_id: student[0].id, skill_id: skillId.Linux, proficiency_level: "intermediate", updated_at: now },
      // Nombre con espacios: se usa con corchetes y comillas.
      { student_id: student[0].id, skill_id: skillId["Trabajo en equipo"], proficiency_level: "advanced", updated_at: now },
    ]);

    // student_interests: 1:N, solo necesita el student_id.
    await queryInterface.bulkInsert("student_interests", [
      { student_id: student[0].id, name: "Contabilidad", description: "Le interesa la gestión contable de empresas" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const student = await queryInterface.sequelize.query(
      "SELECT id FROM students WHERE national_id = :nid",
      { replacements: { nid: "12345678Z" }, type: Sequelize.QueryTypes.SELECT }
    );
    await queryInterface.bulkDelete("student_interests", { student_id: student[0].id });
    await queryInterface.bulkDelete("student_skills", { student_id: student[0].id });
  },
};
