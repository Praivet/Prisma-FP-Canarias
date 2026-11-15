'use strict';

// TrainingProgram: lado "muchos" de 1:N ProfessionalFamily -> TrainingProgram y EducationalCenter -> TrainingProgram
// (tiene las FKs family_id y center_id), y lado "uno" de 1:N TrainingProgram -> StudentEnrollment
// y TrainingProgram -> TutorAssignment.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("training_programs", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      // FK de 1:N ProfessionalFamily -> TrainingProgram.
      // references crea la FOREIGN KEY en la BD: { model: tabla, key: columna }.
      family_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "professional_families", key: "id" },
        onUpdate: "CASCADE",
        // RESTRICT: no se puede borrar una familia que tenga ciclos.
        onDelete: "RESTRICT",
      },
      // FK de 1:N EducationalCenter -> TrainingProgram.
      center_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "educational_centers", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      name: { type: Sequelize.STRING(150), allowNull: false },
      code: { type: Sequelize.STRING(20), allowNull: false },
      level: { type: Sequelize.STRING(50), allowNull: false },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
    });
  },

  // cascade: true (PostgreSQL) borra también las FKs de otras tablas que apuntan a esta
  // (p. ej. internships -> student_enrollments, que crea el sync() de la API). Sin él, DROP TABLE falla.
  async down(queryInterface) {
    await queryInterface.dropTable("training_programs", { cascade: true });
  },
};
