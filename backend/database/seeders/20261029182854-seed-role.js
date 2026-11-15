'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      { name: 'ADMIN', description: 'Full access to the whole platform' },
      { name: 'COORDINATOR', description: 'Manages students, companies and surveys of a center' },
      { name: 'TEACHER', description: 'Consults students and companies' },
      { name: 'STUDENT', description: 'Student who answers surveys' },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', {
      name: ['ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT'],
    }, {});
  }
};