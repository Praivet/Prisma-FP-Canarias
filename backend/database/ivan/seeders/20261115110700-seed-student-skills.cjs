'use strict';

// StudentSkill: tabla intermedia de la N:M Student <-> Skill. Cada fila une un alumno con una skill.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const students = await queryInterface.sequelize.query(
      "SELECT id, national_id FROM students WHERE national_id IN (:ids)",
      { replacements: { ids: ["45123456D", "78654321W"] }, type: Sequelize.QueryTypes.SELECT }
    );
    const skills = await queryInterface.sequelize.query("SELECT id, name FROM skills", { type: Sequelize.QueryTypes.SELECT });
    const studentId = Object.fromEntries(students.map((s) => [s.national_id, s.id]));
    const skillId = Object.fromEntries(skills.map((s) => [s.name, s.id]));

    // Niveles usados: basic, intermediate, advanced.
    await queryInterface.bulkInsert("student_skills", [
      { student_id: studentId["45123456D"], skill_id: skillId.JavaScript, proficiency_level: "advanced", updated_at: now },
      { student_id: studentId["45123456D"], skill_id: skillId.TypeScript, proficiency_level: "intermediate", updated_at: now },
      { student_id: studentId["45123456D"], skill_id: skillId.React, proficiency_level: "intermediate", updated_at: now },
      { student_id: studentId["45123456D"], skill_id: skillId.Git, proficiency_level: "advanced", updated_at: now },
      // SQL lo tienen los dos: así la N:M se ve en las dos direcciones (GET /skills/:id/eagerly).
      { student_id: studentId["45123456D"], skill_id: skillId.SQL, proficiency_level: "intermediate", updated_at: now },
      { student_id: studentId["78654321W"], skill_id: skillId.SQL, proficiency_level: "basic", updated_at: now },
      { student_id: studentId["78654321W"], skill_id: skillId["Redes TCP/IP"], proficiency_level: "advanced", updated_at: now },
      { student_id: studentId["78654321W"], skill_id: skillId.Docker, proficiency_level: "intermediate", updated_at: now },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const students = await queryInterface.sequelize.query(
      "SELECT id FROM students WHERE national_id IN (:ids)",
      { replacements: { ids: ["45123456D", "78654321W"] }, type: Sequelize.QueryTypes.SELECT }
    );
    await queryInterface.bulkDelete("student_skills", { student_id: students.map((s) => s.id) });
  },
};
