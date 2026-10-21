'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */

    await queryInterface.bulkInsert('User', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('User', null, {});

  }
};
