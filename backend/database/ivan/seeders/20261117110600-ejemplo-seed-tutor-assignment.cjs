'use strict';

// EJEMPLO: "Asigna a Carmen como tutora del ciclo ADG-GA en el curso 2026-2027".
// tutor_assignments tiene tres FKs: tutor_id (-> users), program_id y academic_year_id.
// OJO: la FK al usuario se llama tutor_id, NO user_id (mirar la migración 100800).

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tutor = await queryInterface.sequelize.query(
      "SELECT id FROM users WHERE email = :email",
      { replacements: { email: "carmen@prismafp.test" }, type: Sequelize.QueryTypes.SELECT }
    );
    const program = await queryInterface.sequelize.query(
      "SELECT id FROM training_programs WHERE code = :code",
      { replacements: { code: "ADG-GA" }, type: Sequelize.QueryTypes.SELECT }
    );
    const year = await queryInterface.sequelize.query(
      "SELECT id FROM academic_years WHERE name = :name",
      { replacements: { name: "2026-2027" }, type: Sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert("tutor_assignments", [
      { tutor_id: tutor[0].id, program_id: program[0].id, academic_year_id: year[0].id, assigned_at: new Date("2026-09-07") },
    ]);
  },

  // Borro por el ciclo: es la única asignación de ADG-GA.
  async down(queryInterface, Sequelize) {
    const program = await queryInterface.sequelize.query(
      "SELECT id FROM training_programs WHERE code = :code",
      { replacements: { code: "ADG-GA" }, type: Sequelize.QueryTypes.SELECT }
    );
    await queryInterface.bulkDelete("tutor_assignments", { program_id: program[0].id });
  },
};
