'use strict';

// Student: lado con la FK de la 1:1 User -> Student. Cada alumno apunta a un usuario distinto (user_id unique).

const NATIONAL_IDS = ["45123456D", "78654321W"];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const users = await queryInterface.sequelize.query(
      "SELECT id, email FROM users WHERE email IN (:emails)",
      { replacements: { emails: ["ana@prismafp.test", "pablo@prismafp.test"] }, type: Sequelize.QueryTypes.SELECT }
    );
    const userId = Object.fromEntries(users.map((u) => [u.email, u.id]));

    await queryInterface.bulkInsert("students", [
      {
        user_id: userId["ana@prismafp.test"],
        national_id: "45123456D",
        first_name: "Ana",
        last_name: "Pérez Medina",
        email: "ana@prismafp.test",
        phone: "628123456",
        birth_date: "2004-03-15",
        created_at: now,
        updated_at: now,
      },
      {
        user_id: userId["pablo@prismafp.test"],
        national_id: "78654321W",
        first_name: "Pablo",
        last_name: "Suárez Quintana",
        email: "pablo@prismafp.test",
        phone: null,
        birth_date: "2002-11-02",
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("students", { national_id: NATIONAL_IDS });
  },
};
