'use strict';

const TAX_IDS = ['B35123456', 'B38234567', 'A35345678', 'B35456789'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('companies', [
      { tax_id: 'B35123456', name: 'Atlántica Software S.L.', sector: 'Desarrollo de software', city: 'Las Palmas de Gran Canaria', contact_email: 'rrhh@atlanticasoftware.test', contact_phone: '928111222', created_at: now, updated_at: now },
      { tax_id: 'B38234567', name: 'Teide Redes S.L.', sector: 'Telecomunicaciones', city: 'Santa Cruz de Tenerife', contact_email: 'empleo@teideredes.test', contact_phone: '922333444', created_at: now, updated_at: now },
      { tax_id: 'A35345678', name: 'Hospital Insular Sur S.A.', sector: 'Sanidad', city: 'San Bartolomé de Tirajana', contact_email: 'seleccion@hospitalsur.test', contact_phone: null, created_at: now, updated_at: now },
      { tax_id: 'B35456789', name: 'Gestoría Canaria S.L.', sector: 'Administración', city: 'Telde', contact_email: null, contact_phone: '928555666', created_at: now, updated_at: now },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('companies', {
      tax_id: TAX_IDS,
    }, {});
  }
};
