'use strict';

// StudentInterest: lado "muchos" de 1:N Student -> StudentInterest.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const students = await queryInterface.sequelize.query(
      "SELECT id, national_id FROM students WHERE national_id IN (:ids)",
      { replacements: { ids: ["45123456D", "78654321W"] }, type: Sequelize.QueryTypes.SELECT }
    );
    const studentId = Object.fromEntries(students.map((s) => [s.national_id, s.id]));

    await queryInterface.bulkInsert("student_interests", [
      { student_id: studentId["45123456D"], name: "Desarrollo frontend", description: "Interfaces web con React" },
      { student_id: studentId["45123456D"], name: "Teletrabajo", description: "Prefiere puestos en remoto o híbridos" },
      { student_id: studentId["78654321W"], name: "Ciberseguridad", description: "Le gustaría especializarse en seguridad" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const students = await queryInterface.sequelize.query(
      "SELECT id FROM students WHERE national_id IN (:ids)",
      { replacements: { ids: ["45123456D", "78654321W"] }, type: Sequelize.QueryTypes.SELECT }
    );
    await queryInterface.bulkDelete("student_interests", { student_id: students.map((s) => s.id) });
  },
};
