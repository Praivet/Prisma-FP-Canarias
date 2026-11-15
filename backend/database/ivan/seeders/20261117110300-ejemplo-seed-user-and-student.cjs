'use strict';

// EJEMPLO: "Crea una alumna nueva". Un Student necesita un User (1:1, students.user_id),
// así que en el mismo seeder: 1) insertar el user  2) buscar su id  3) insertar el student.
// El down va AL REVÉS: primero el student (el hijo) y luego el user (el padre).

const EMAIL = "maria@prismafp.test";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // users y students tienen timestamps (created_at, updated_at): hay que rellenarlos.
    const now = new Date();

    await queryInterface.bulkInsert("users", [
      { email: EMAIL, password_hash: "hash-maria", first_name: "María", last_name: "González Ramos", created_at: now, updated_at: now },
    ]);

    const user = await queryInterface.sequelize.query(
      "SELECT id FROM users WHERE email = :email",
      { replacements: { email: EMAIL }, type: Sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert("students", [
      {
        user_id: user[0].id,
        national_id: "12345678Z",
        first_name: "María",
        last_name: "González Ramos",
        email: EMAIL,
        phone: "622334455",
        birth_date: "2006-05-20",
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("students", { national_id: "12345678Z" });
    await queryInterface.bulkDelete("users", { email: EMAIL });
  },
};
