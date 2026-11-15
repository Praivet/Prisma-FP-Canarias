'use strict';

// NO son entidades mías, pero mis tablas tienen FKs hacia ellas:
// students.user_id y tutor_assignments.tutor_id -> users
// training_programs.family_id -> professional_families
// training_programs.center_id -> educational_centers
// Una FK solo se puede crear si la tabla a la que apunta ya existe: por eso esta migración va la primera.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      password_hash: { type: Sequelize.STRING(255), allowNull: false },
      first_name: { type: Sequelize.STRING(100), allowNull: false },
      last_name: { type: Sequelize.STRING(100), allowNull: false },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      failed_login_attempts: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      locked_until: { type: Sequelize.DATE, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });

    await queryInterface.createTable("professional_families", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      name: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      code: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      description: { type: Sequelize.TEXT, allowNull: true },
    });

    await queryInterface.createTable("educational_centers", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      name: { type: Sequelize.STRING(255), allowNull: false },
      code: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      logo_url: { type: Sequelize.STRING(500), allowNull: true },
      address: { type: Sequelize.STRING(255), allowNull: true },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
    });
  },

  // down deshace up en orden inverso.
  // cascade: true (PostgreSQL) borra también las FKs de otras tablas que apuntan a esta
  // (p. ej. internships -> student_enrollments, que crea el sync() de la API). Sin él, DROP TABLE falla.
  async down(queryInterface) {
    await queryInterface.dropTable("educational_centers", { cascade: true });
    await queryInterface.dropTable("professional_families", { cascade: true });
    await queryInterface.dropTable("users", { cascade: true });
  },
};
