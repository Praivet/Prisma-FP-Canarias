'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('educational_centers', [
      {
        name: 'IES Las Palmas Centro',
        code: 'CEN-0001',
        logo_url: 'https://example.com/logos/las-palmas-centro.png',
        address: 'Calle Triana 12, Las Palmas de Gran Canaria',
        is_active: true,
      },
      {
        name: 'IES Tenerife Norte',
        code: 'CEN-0002',
        logo_url: 'https://example.com/logos/tenerife-norte.png',
        address: 'Avenida de Anaga 45, Santa Cruz de Tenerife',
        is_active: true,
      },
      {
        name: 'IES Maspalomas',
        code: 'CEN-0003',
        logo_url: 'https://example.com/logos/maspalomas.png',
        address: 'Calle Tirajana 3, San Bartolomé de Tirajana',
        is_active: true,
      },
      {
        name: 'IES Lanzarote Sur',
        code: 'CEN-0004',
        logo_url: null,
        address: 'Calle Timanfaya 8, Arrecife',
        is_active: false,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('educational_centers', {
      code: ['CEN-0001', 'CEN-0002', 'CEN-0003', 'CEN-0004'],
    }, {});
  }
};