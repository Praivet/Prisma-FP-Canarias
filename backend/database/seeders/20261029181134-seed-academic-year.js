'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Only the current academic year is active.
    await queryInterface.bulkInsert('academic_years', [
      { name: '2024-2025', start_date: new Date('2024-09-09'), end_date: new Date('2025-06-20'), is_active: false },
      { name: '2025-2026', start_date: new Date('2025-09-08'), end_date: new Date('2026-06-19'), is_active: false },
      { name: '2026-2027', start_date: new Date('2026-09-14'), end_date: new Date('2027-06-18'), is_active: true },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('academic_years', {
      name: ['2024-2025', '2025-2026', '2026-2027'],
    }, {});
  }
};
