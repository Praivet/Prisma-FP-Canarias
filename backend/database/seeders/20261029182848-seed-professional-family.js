'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('professional_families', [
      { name: 'Informática y Comunicaciones', code: 'IFC', description: 'Software development, systems and networks' },
      { name: 'Administración y Gestión', code: 'ADG', description: 'Administration, finance and office management' },
      { name: 'Electricidad y Electrónica', code: 'ELE', description: 'Electrical installations and electronic systems' },
      { name: 'Sanidad', code: 'SAN', description: 'Health care and clinical support' },
      { name: 'Hostelería y Turismo', code: 'HOT', description: 'Catering, hotels and tourism services' },
      { name: 'Comercio y Marketing', code: 'COM', description: 'Sales, commerce and marketing' },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('professional_families', {
      code: ['IFC', 'ADG', 'ELE', 'SAN', 'HOT', 'COM'],
    }, {});
  }
};