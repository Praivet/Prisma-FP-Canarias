"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          id: 1,
          name: "ADMIN",
          description: "Full access to the whole platform",
        },
        {
          id: 2,
          name: "COORDINATOR",
          description: "Manages students, companies and surveys of a center",
        },
        {
          id: 3,
          name: "TEACHER",
          description: "Consults students and companies",
        },
        { 
          id: 4, name: "STUDENT", description: "Student who answers surveys" 
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "roles",
      {
        id: [1, 2, 3, 4],
      },
      {},
    );
  },
};
