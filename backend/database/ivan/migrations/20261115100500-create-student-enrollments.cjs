'use strict';

// StudentEnrollment: lado "muchos" de tres 1:N (Student, TrainingProgram y AcademicYear -> StudentEnrollment).
// Por eso tiene tres FKs, y su migración va después de las de esas tres tablas.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("student_enrollments", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      // FK de 1:N Student -> StudentEnrollment. CASCADE como en associations.ts.
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "students", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      // FK de 1:N TrainingProgram -> StudentEnrollment.
      program_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "training_programs", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      // FK de 1:N AcademicYear -> StudentEnrollment.
      academic_year_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "academic_years", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      // Sequelize.literal("CURRENT_DATE") = valor por defecto que calcula la propia BD (la fecha de hoy).
      enrollment_date: { type: Sequelize.DATEONLY, allowNull: false, defaultValue: Sequelize.literal("CURRENT_DATE") },
      graduation_date: { type: Sequelize.DATEONLY, allowNull: true },
      status: { type: Sequelize.STRING(30), allowNull: false, defaultValue: "enrolled" },
    });
  },

  // cascade: true (PostgreSQL) borra también las FKs de otras tablas que apuntan a esta
  // (p. ej. internships -> student_enrollments, que crea el sync() de la API). Sin él, DROP TABLE falla.
  async down(queryInterface) {
    await queryInterface.dropTable("student_enrollments", { cascade: true });
  },
};
