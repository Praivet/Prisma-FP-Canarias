import { defineAssociations } from "./models/associations.js";
import { app } from "./app.js";
import { sequelize } from "./config/database.js";
import { env } from "./config/env.js";

async function startServer() {
  try {

    defineAssociations();

    await sequelize.authenticate();



    console.log("Conexión con PostgreSQL establecida.");

    await sequelize.sync();

    console.log("Modelos sincronizados.");

    app.listen(env.PORT, () => {
      console.log(
        `Servidor funcionando en http://localhost:${env.PORT}`
      );
    });

  } catch (error) {

    console.error(
      "No se pudo iniciar la aplicación:",
      error
    );

    process.exit(1);
  }
}

startServer();