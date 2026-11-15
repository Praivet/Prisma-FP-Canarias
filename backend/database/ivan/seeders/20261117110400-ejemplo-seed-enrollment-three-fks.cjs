'use strict';

// EJEMPLO: fila con TRES FKs (student_enrollments: student_id, program_id, academic_year_id).
// Mismo patrón que siempre, repetido tres veces: SELECT por un campo único -> [0].id -> bulkInsert.
// Va DESPUÉS de los seeders que crean la alumna (110300) y el ciclo (110200): el orden es el nombre del archivo.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const student = await queryInterface.sequelize.query(
      "SELECT id FROM students WHERE national_id = :nid",
      { replacements: { nid: "12345678Z" }, type: Sequelize.QueryTypes.SELECT }
    );
    const program = await queryInterface.sequelize.query(
      "SELECT id FROM training_programs WHERE code = :code",
      { replacements: { code: "ADG-GA" }, type: Sequelize.QueryTypes.SELECT }
    );
    const year = await queryInterface.sequelize.query(
      "SELECT id FROM academic_years WHERE name = :name",
      { replacements: { name: "2026-2027" }, type: Sequelize.QueryTypes.SELECT }
    );

    // student_enrollments NO tiene timestamps, así que no van created_at ni updated_at.
    await queryInterface.bulkInsert("student_enrollments", [
      {
        student_id: student[0].id,
        program_id: program[0].id,
        academic_year_id: year[0].id,
        enrollment_date: "2026-09-15",
        status: "enrolled",
      },
    ]);
  },

  // Para borrar necesito el id de la alumna. OJO: en el down no existe la variable "student" del up,
  // hay que volver a hacer el SELECT.
  async down(queryInterface, Sequelize) {
    const student = await queryInterface.sequelize.query(
      "SELECT id FROM students WHERE national_id = :nid",
      { replacements: { nid: "12345678Z" }, type: Sequelize.QueryTypes.SELECT }
    );
    await queryInterface.bulkDelete("student_enrollments", { student_id: student[0].id });
  },
};
