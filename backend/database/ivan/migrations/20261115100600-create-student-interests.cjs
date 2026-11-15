'use strict';

// StudentInterest: lado "muchos" de 1:N Student -> StudentInterest (FK student_id).

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("student_interests", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "students", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      name: { type: Sequelize.STRING(150), allowNull: false },
      description: { type: Sequelize.STRING(255), allowNull: true },
    });
  },

  // cascade: true (PostgreSQL) borra también las FKs de otras tablas que apuntan a esta
  // (p. ej. internships -> student_enrollments, que crea el sync() de la API). Sin él, DROP TABLE falla.
  async down(queryInterface) {
    await queryInterface.dropTable("student_interests", { cascade: true });
  },
};
