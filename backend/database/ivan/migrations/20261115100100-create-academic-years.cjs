'use strict';

// AcademicYear: lado "uno" de 1:N AcademicYear -> StudentEnrollment y AcademicYear -> TutorAssignment.
// No tiene FKs: las FKs (academic_year_id) están en las tablas del lado "muchos".

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("academic_years", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      // Ejemplo: "2025-2026". unique: no puede haber dos cursos con el mismo nombre.
      name: { type: Sequelize.STRING(20), allowNull: false, unique: true },
      // DATEONLY = tipo DATE de SQL (solo fecha, sin hora).
      start_date: { type: Sequelize.DATEONLY, allowNull: false },
      end_date: { type: Sequelize.DATEONLY, allowNull: false },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      // Sin created_at/updated_at: el modelo tiene timestamps: false.
    });
  },

  // cascade: true (PostgreSQL) borra también las FKs de otras tablas que apuntan a esta
  // (p. ej. internships -> student_enrollments, que crea el sync() de la API). Sin él, DROP TABLE falla.
  async down(queryInterface) {
    await queryInterface.dropTable("academic_years", { cascade: true });
  },
};
