// Conexión que usa sequelize-cli (db:migrate, db:seed...). Es la misma BD que usa la API:
// lee las mismas variables de .env y .env.<NODE_ENV> que src/config/env.ts.
// .cjs porque el proyecto es "type": "module" y sequelize-cli carga este archivo con require().
const path = require("path");
const dotenv = require("dotenv");

const backendDir = path.resolve(__dirname, "..", "..");
const nodeEnv = process.env.NODE_ENV || "development";

dotenv.config({ path: path.join(backendDir, ".env") });
dotenv.config({ path: path.join(backendDir, `.env.${nodeEnv}`), override: true });

const connection = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  dialect: process.env.DB_DIALECT || "postgres",
  logging: false,
  // Tabla donde sequelize-cli apunta qué migraciones ya se ejecutaron (SequelizeMeta, por defecto).
  migrationStorageTableName: "SequelizeMeta",
  // Guarda también qué seeders se ejecutaron (tabla SequelizeData). Sin esto, db:seed:all los repetiría.
  seederStorage: "sequelize",
  seederStorageTableName: "SequelizeData",
};

module.exports = {
  development: connection,
  test: connection,
  production: connection,
};
