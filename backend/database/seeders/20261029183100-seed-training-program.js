'use strict';

const PROGRAM_CODES = ['IFC-DAW', 'IFC-DAM', 'IFC-ASIR', 'IFC-SMR', 'ADG-AF', 'ADG-GA', 'SAN-CAE', 'HOT-DC'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Depends on the professional-family and educational-center seeders.
    const families = await queryInterface.sequelize.query(
      'SELECT id, code FROM professional_families WHERE code IN (:codes)',
      {
        replacements: { codes: ['IFC', 'ADG', 'SAN', 'HOT'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const centers = await queryInterface.sequelize.query(
      'SELECT id, code FROM educational_centers WHERE code IN (:codes)',
      {
        replacements: { codes: ['CEN-0001', 'CEN-0002', 'CEN-0003'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const familyId = Object.fromEntries(families.map((f) => [f.code, f.id]));
    const centerId = Object.fromEntries(centers.map((c) => [c.code, c.id]));

    await queryInterface.bulkInsert('training_programs', [
      { family_id: familyId.IFC, center_id: centerId['CEN-0001'], name: 'Desarrollo de Aplicaciones Web', code: 'IFC-DAW', level: 'Grado Superior', is_active: true },
      { family_id: familyId.IFC, center_id: centerId['CEN-0002'], name: 'Desarrollo de Aplicaciones Multiplataforma', code: 'IFC-DAM', level: 'Grado Superior', is_active: true },
      { family_id: familyId.IFC, center_id: centerId['CEN-0001'], name: 'Administración de Sistemas Informáticos en Red', code: 'IFC-ASIR', level: 'Grado Superior', is_active: true },
      { family_id: familyId.IFC, center_id: centerId['CEN-0003'], name: 'Sistemas Microinformáticos y Redes', code: 'IFC-SMR', level: 'Grado Medio', is_active: true },
      { family_id: familyId.ADG, center_id: centerId['CEN-0002'], name: 'Administración y Finanzas', code: 'ADG-AF', level: 'Grado Superior', is_active: true },
      { family_id: familyId.ADG, center_id: centerId['CEN-0003'], name: 'Gestión Administrativa', code: 'ADG-GA', level: 'Grado Medio', is_active: true },
      { family_id: familyId.SAN, center_id: centerId['CEN-0001'], name: 'Cuidados Auxiliares de Enfermería', code: 'SAN-CAE', level: 'Grado Medio', is_active: true },
      { family_id: familyId.HOT, center_id: centerId['CEN-0003'], name: 'Dirección de Cocina', code: 'HOT-DC', level: 'Grado Superior', is_active: false },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('training_programs', {
      code: PROGRAM_CODES,
    }, {});
  }
};
