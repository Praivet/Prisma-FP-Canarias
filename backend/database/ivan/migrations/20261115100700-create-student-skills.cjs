'use strict';

// StudentSkill: tabla intermedia de la N:M Student <-> Skill (como order_items en Bicycle-shop).
// Tiene las dos FKs y su PK es compuesta (student_id + skill_id): un alumno no puede tener la misma skill dos veces.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("student_skills", {
      // primaryKey: true en dos columnas = PK compuesta.
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "students", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      skill_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "skills", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      proficiency_level: { type: Sequelize.STRING(30), allowNull: true },
      // El modelo tiene timestamps: true con createdAt: false, así que solo hay updated_at.
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  // cascade: true (PostgreSQL) borra también las FKs de otras tablas que apuntan a esta
  // (p. ej. internships -> student_enrollments, que crea el sync() de la API). Sin él, DROP TABLE falla.
  async down(queryInterface) {
    await queryInterface.dropTable("student_skills", { cascade: true });
  },
};
