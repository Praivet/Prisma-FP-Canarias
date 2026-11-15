'use strict';

// Skill: un lado de la N:M Student <-> Skill. No tiene FKs: están en la tabla intermedia student_skills.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("skills", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      name: { type: Sequelize.STRING(150), allowNull: false, unique: true },
      category: { type: Sequelize.STRING(100), allowNull: true },
      description: { type: Sequelize.STRING(255), allowNull: true },
    });
  },

  // cascade: true (PostgreSQL) borra también las FKs de otras tablas que apuntan a esta
  // (p. ej. internships -> student_enrollments, que crea el sync() de la API). Sin él, DROP TABLE falla.
  async down(queryInterface) {
    await queryInterface.dropTable("skills", { cascade: true });
  },
};
