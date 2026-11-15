'use strict';

// EJEMPLO: cambiar una FK en una fila que YA existe -> bulkUpdate (no bulkInsert).
// "El ciclo IFC-DAM pasa a impartirse en el centro CEN-0001."
// bulkUpdate(tabla, qué pongo, dónde)  ==  UPDATE tabla SET ... WHERE ...

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const center = await queryInterface.sequelize.query(
      "SELECT id FROM educational_centers WHERE code = :code",
      { replacements: { code: "CEN-0001" }, type: Sequelize.QueryTypes.SELECT }
    );
    await queryInterface.bulkUpdate("training_programs", { center_id: center[0].id }, { code: "IFC-DAM" });
  },

  // down: dejarlo como estaba antes (DAM estaba en CEN-0002). Se busca el id otra vez.
  async down(queryInterface, Sequelize) {
    const center = await queryInterface.sequelize.query(
      "SELECT id FROM educational_centers WHERE code = :code",
      { replacements: { code: "CEN-0002" }, type: Sequelize.QueryTypes.SELECT }
    );
    await queryInterface.bulkUpdate("training_programs", { center_id: center[0].id }, { code: "IFC-DAM" });
  },
};
