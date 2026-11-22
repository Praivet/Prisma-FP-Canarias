'use strict';

// EJEMPLO: crear un índice para que las búsquedas por una columna vayan más rápido.
// No cambia el modelo: el índice solo existe en la base de datos.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // addIndex(tabla, [columnas], { name })
    await queryInterface.addIndex("student_enrollments", ["status"], {
      name: "student_enrollments_status_idx",
    });
  },

  // removeIndex(tabla, nombre del índice)
  async down(queryInterface) {
    await queryInterface.removeIndex("student_enrollments", "student_enrollments_status_idx");
  },
};
