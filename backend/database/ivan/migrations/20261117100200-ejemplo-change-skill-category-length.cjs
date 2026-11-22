'use strict';

// EJEMPLO: modificar una columna que ya existe (tipo, tamaño o allowNull) -> changeColumn.
// El down vuelve a dejarla exactamente como estaba antes.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // changeColumn(tabla, columna, definición NUEVA completa)
    await queryInterface.changeColumn("skills", "category", {
      type: Sequelize.STRING(150), // antes era STRING(100)
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("skills", "category", {
      type: Sequelize.STRING(100), // como estaba
      allowNull: true,
    });
  },
};
