'use strict';

const TAX_IDS = ['B35123456', 'B38234567'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    // Depende del seeder de company: se busca el id de cada empresa por su tax_id
    const companies = await queryInterface.sequelize.query(
      'SELECT id, tax_id FROM companies WHERE tax_id IN (:taxIds)',
      {
        replacements: { taxIds: TAX_IDS },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const companyId = Object.fromEntries(companies.map((c) => [c.tax_id, c.id]));

    // operation admite CREATE, MODIFY, READ o null
    await queryInterface.bulkInsert('examen_audit', [
      { company_id: companyId['B35123456'], description: 'Alta de la empresa en la plataforma', operation: 'CREATE', created_at: now, updated_at: now },
      { company_id: companyId['B35123456'], description: 'Cambio del email de contacto', operation: 'MODIFY', created_at: now, updated_at: now },
      { company_id: companyId['B38234567'], description: 'Alta de la empresa en la plataforma', operation: 'CREATE', created_at: now, updated_at: now },
      { company_id: companyId['B38234567'], description: 'Consulta de la ficha de la empresa', operation: 'READ', created_at: now, updated_at: now },
      { company_id: companyId['B38234567'], description: 'Registro sin operación indicada', operation: null, created_at: now, updated_at: now },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const companies = await queryInterface.sequelize.query(
      'SELECT id FROM companies WHERE tax_id IN (:taxIds)',
      {
        replacements: { taxIds: TAX_IDS },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    await queryInterface.bulkDelete('examen_audit', {
      company_id: companies.map((c) => c.id),
    }, {});
  }
};
