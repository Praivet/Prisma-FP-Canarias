'use strict';

// EJEMPLO: fila nueva con FKs (training_programs tiene family_id y center_id).
// Pasos: 1) SELECT para sacar el id de cada tabla padre  2) bulkInsert usando [0].id
// Nunca escribas el id a mano (1, 2...): depende del orden en que se insertaron las filas.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Cada SELECT devuelve un ARRAY de filas: [{ id: 2 }]. Por eso luego se usa family[0].id.
    const family = await queryInterface.sequelize.query(
      "SELECT id FROM professional_families WHERE code = :code",
      { replacements: { code: "ADG" }, type: Sequelize.QueryTypes.SELECT }
    );
    const center = await queryInterface.sequelize.query(
      "SELECT id FROM educational_centers WHERE code = :code",
      { replacements: { code: "CEN-0001" }, type: Sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert("training_programs", [
      {
        family_id: family[0].id,
        center_id: center[0].id,
        name: "Gestión Administrativa",
        code: "ADG-GA",
        level: "Grado Medio",
        is_active: true,
      },
    ]);
  },

  // Para borrar basta con un campo único de la fila (code). No hace falta buscar nada.
  async down(queryInterface) {
    await queryInterface.bulkDelete("training_programs", { code: "ADG-GA" });
  },
};
