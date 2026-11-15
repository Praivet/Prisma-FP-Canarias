'use strict';

// TrainingProgram: lado "muchos" de 1:N ProfessionalFamily -> TrainingProgram y EducationalCenter -> TrainingProgram.
// Necesita los ids de la familia y del centro. No los escribimos a mano (1, 2...) porque dependen
// del orden en que se insertaron: los buscamos por su código, que es único.

const CODES = ["IFC-DAW", "IFC-DAM", "IFC-SMR", "ADG-AF"];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // queryInterface.sequelize.query lanza SQL a mano. QueryTypes.SELECT devuelve directamente las filas.
    const families = await queryInterface.sequelize.query(
      "SELECT id, code FROM professional_families WHERE code IN (:codes)",
      { replacements: { codes: ["IFC", "ADG"] }, type: Sequelize.QueryTypes.SELECT }
    );
    const centers = await queryInterface.sequelize.query(
      "SELECT id, code FROM educational_centers WHERE code IN (:codes)",
      { replacements: { codes: ["CEN-0001", "CEN-0002"] }, type: Sequelize.QueryTypes.SELECT }
    );
    // De [{ id: 1, code: "IFC" }, ...] a { IFC: 1, ... } para buscar el id por código.
    const familyId = Object.fromEntries(families.map((f) => [f.code, f.id]));
    const centerId = Object.fromEntries(centers.map((c) => [c.code, c.id]));

    await queryInterface.bulkInsert("training_programs", [
      { family_id: familyId.IFC, center_id: centerId["CEN-0001"], name: "Desarrollo de Aplicaciones Web", code: "IFC-DAW", level: "Grado Superior", is_active: true },
      { family_id: familyId.IFC, center_id: centerId["CEN-0002"], name: "Desarrollo de Aplicaciones Multiplataforma", code: "IFC-DAM", level: "Grado Superior", is_active: true },
      { family_id: familyId.IFC, center_id: centerId["CEN-0001"], name: "Sistemas Microinformáticos y Redes", code: "IFC-SMR", level: "Grado Medio", is_active: true },
      { family_id: familyId.ADG, center_id: centerId["CEN-0002"], name: "Administración y Finanzas", code: "ADG-AF", level: "Grado Superior", is_active: false },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("training_programs", { code: CODES });
  },
};
