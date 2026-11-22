'use strict';

// Student: lado con la FK de la 1:1 User -> Student (user_id con unique: un usuario, un alumno).
// Es el lado "uno" de 1:N Student -> StudentEnrollment y Student -> StudentInterest,
// y un lado de la N:M Student <-> Skill.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("students", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      // FK de la 1:1. unique: true es lo que la hace 1:1 y no 1:N.
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        // CASCADE: si se borra el usuario, se borra su alumno (igual que onDelete en associations.ts).
        onDelete: "CASCADE",
      },
      national_id: { type: Sequelize.STRING(20), allowNull: false, unique: true },
      first_name: { type: Sequelize.STRING(100), allowNull: false },
      last_name: { type: Sequelize.STRING(150), allowNull: false },
      email: { type: Sequelize.STRING(150), allowNull: false },
      phone: { type: Sequelize.STRING(20), allowNull: true },
      birth_date: { type: Sequelize.DATEONLY, allowNull: true },
      // El modelo tiene timestamps: true, así que la tabla necesita las dos columnas.
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  // cascade: true (PostgreSQL) borra también las FKs de otras tablas que apuntan a esta
  // (p. ej. internships -> student_enrollments, que crea el sync() de la API). Sin él, DROP TABLE falla.
  async down(queryInterface) {
    await queryInterface.dropTable("students", { cascade: true });
  },
};
