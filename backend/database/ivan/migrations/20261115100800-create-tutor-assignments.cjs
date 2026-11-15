'use strict';

// TutorAssignment: no es tabla intermedia, es una entidad con tres FKs, cada una el lado "muchos" de una 1:N:
// User -> TutorAssignment (tutor_id), TrainingProgram -> TutorAssignment (program_id)
// y AcademicYear -> TutorAssignment (academic_year_id).

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tutor_assignments", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      tutor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      program_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "training_programs", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      academic_year_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "academic_years", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      assigned_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
    });

    // Índice para buscar rápido las asignaciones de un tutor (GET /tutor-assignments/tutor/:tutorId).
    await queryInterface.addIndex("tutor_assignments", ["tutor_id"]);
  },

  // cascade: true (PostgreSQL) borra también las FKs de otras tablas que apuntan a esta
  // (p. ej. internships -> student_enrollments, que crea el sync() de la API). Sin él, DROP TABLE falla.
  async down(queryInterface) {
    await queryInterface.dropTable("tutor_assignments", { cascade: true });
  },
};
