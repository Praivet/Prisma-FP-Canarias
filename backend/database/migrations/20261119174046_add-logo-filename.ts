import { QueryInterface, DataTypes } from 'sequelize';

/**
 * Migration: 20261119174046_add-logo-filename
 * Añade la columna filename (nombre del archivo del logo subido con Multer) a companies.
 */

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn('companies', 'filename', { type: DataTypes.TEXT, allowNull: true });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn('companies', 'filename');
}
