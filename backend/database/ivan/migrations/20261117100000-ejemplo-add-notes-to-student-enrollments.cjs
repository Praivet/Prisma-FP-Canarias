'use strict';

// EJEMPLO: añadir una columna NORMAL (no FK) a una tabla que ya existe.
// Caso de examen: "añade a X el campo Y". La tabla ya existe -> addColumn / removeColumn (nunca createTable).
// Recuerda cambiar también el modelo (declare + init), o Sequelize no conocerá la columna.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // addColumn(tabla, columna en snake_case, opciones)
    await queryInterface.addColumn("student_enrollments", "notes", {
      type: Sequelize.TEXT, // TEXT = texto largo sin límite; STRING(n) = texto corto con límite
      allowNull: true, // las filas que ya existen no tienen valor, así que tiene que poder ser null
    });
  },

  // down = lo contrario del up: misma tabla y misma columna.
  async down(queryInterface) {
    await queryInterface.removeColumn("student_enrollments", "notes");
  },
};
