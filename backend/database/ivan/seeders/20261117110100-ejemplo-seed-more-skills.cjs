'use strict';

// EJEMPLO: "Crea estas skills" -> tabla SIN FKs: solo bulkInsert, no hay que buscar ningún id.
// Truco: guardar los nombres en una constante arriba para usarla en el down.

const NAMES = ["Python", "Angular", "Linux"];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Columnas en snake_case, igual que en la migración (no como en el modelo).
    await queryInterface.bulkInsert("skills", [
      { name: "Python", category: "Programming", description: "General purpose language for scripting and data" },
      { name: "Angular", category: "Frontend", description: "Framework for single page applications" },
      { name: "Linux", category: "Systems", description: "Administration of Linux servers" },
    ]);
  },

  // { name: NAMES } = DELETE FROM skills WHERE name IN ('Python', 'Angular', 'Linux')
  async down(queryInterface) {
    await queryInterface.bulkDelete("skills", { name: NAMES });
  },
};
