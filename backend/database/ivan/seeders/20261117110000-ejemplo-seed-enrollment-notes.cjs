'use strict';

// EJEMPLO: rellenar una columna nueva en filas que YA existen -> bulkUpdate (no bulkInsert).
// Caso fácil: el "dónde" es una columna de la propia tabla (status), así que no hace falta buscar ids.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // bulkUpdate(tabla, qué pongo, dónde)  ==  UPDATE tabla SET ... WHERE ...
    await queryInterface.bulkUpdate("student_enrollments", { notes: "Abandonó el ciclo a mitad de curso" }, { status: "dropped" });
    await queryInterface.bulkUpdate("student_enrollments", { notes: "Terminó con buenas notas" }, { status: "graduated" });
  },

  // down: dejar la columna como estaba antes del seeder (sin valor = null). {} = todas las filas.
  async down(queryInterface) {
    await queryInterface.bulkUpdate("student_enrollments", { notes: null }, {});
  },
};
