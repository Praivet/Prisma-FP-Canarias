   import {
     generateMigration,
     generateSchemaDiff,
     runMigrations,
     rollbackMigration,
     getMigrationStatus,
   } from 'sequelize-schema-sync';
   import type { SchemaSyncConfig } from 'sequelize-schema-sync';
   import { sequelize } from '../src/config/database.js';
   import { defineAssociations } from '../src/models/associations.js';

   defineAssociations();

   const config: SchemaSyncConfig = {
     sequelize,
     models: Object.values(sequelize.models),
     migrationsPath: './database/migrations',
   };

   const [command, name] = process.argv.slice(2);

   try {
     switch (command) {
       case 'dry-run': {
         const diff = await generateSchemaDiff(config);
         for (const t of diff.tables) {
           console.log(t.action, t.table, Object.keys(t.definition ?? {}).join(', '));
         }
         break;
       }
       case 'generate':
         console.log(await generateMigration(config, name ?? 'create-tables'));
         break;
       case 'migrate':
         console.log(await runMigrations(config));
         break;
       case 'rollback':
         console.log(await rollbackMigration(config));
         break;
       case 'status':
         console.log(await getMigrationStatus(config));
         break;
       default:
         console.log('Uso: dry-run | generate [nombre] | migrate | rollback | status');
     }
   } finally {
     await sequelize.close();
   }