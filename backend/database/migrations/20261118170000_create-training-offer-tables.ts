import { QueryInterface, DataTypes } from 'sequelize';

/**
 * Migration: 20261118170000_create-training-offer-tables
 * Tablas que faltaban en create-tables porque sus modelos no se importaban en associations.ts.
 * Orden: primero las tablas padre de cada FK.
 */

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('educational_centers', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    logo_url: { type: DataTypes.STRING(500), allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  });

  await queryInterface.createTable('professional_families', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true }
  });

  await queryInterface.createTable('training_programs', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    family_id: { type: DataTypes.INTEGER, allowNull: false, references: { "model": "professional_families", "key": "id" } },
    center_id: { type: DataTypes.INTEGER, allowNull: false, references: { "model": "educational_centers", "key": "id" } },
    name: { type: DataTypes.STRING(150), allowNull: false },
    code: { type: DataTypes.STRING(20), allowNull: false },
    level: { type: DataTypes.STRING(50), allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  });

  await queryInterface.createTable('tutor_assignments', {
    id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true },
    tutor_id: { type: DataTypes.INTEGER, allowNull: false, references: { "model": "users", "key": "id" } },
    program_id: { type: DataTypes.INTEGER, allowNull: false, references: { "model": "training_programs", "key": "id" } },
    academic_year_id: { type: DataTypes.INTEGER, allowNull: false, references: { "model": "academic_years", "key": "id" } },
    assigned_at: { type: DataTypes.DATE, allowNull: false }
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('tutor_assignments');
  await queryInterface.dropTable('training_programs');
  await queryInterface.dropTable('professional_families');
  await queryInterface.dropTable('educational_centers');
}
