'use strict';

const SURVEY_TITLES = ['Encuesta de inserción laboral', 'Encuesta de satisfacción de prácticas'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('surveys', [
      { title: 'Encuesta de inserción laboral', description: 'Situación laboral del alumnado tras finalizar el ciclo', is_active: true, created_at: now, updated_at: now },
      { title: 'Encuesta de satisfacción de prácticas', description: 'Valoración de la empresa de prácticas', is_active: false, created_at: now, updated_at: now },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('surveys', {
      title: SURVEY_TITLES,
    }, {});
  }
};
