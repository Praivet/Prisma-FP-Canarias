import { SchemaSyncConfig } from 'sequelize-schema-sync';
import { sequelize } from './src/config/database.js';
import { defineAssociations } from './src/models/associations.js';

defineAssociations(); // debe ir antes de exportar el config

const config: SchemaSyncConfig = {
  sequelize,
  models: Object.values(sequelize.models),
  migrationsPath: './database/migrations',
};

export default config;