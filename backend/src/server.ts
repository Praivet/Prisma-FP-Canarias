import { defineAssociations } from "./models/associations.js";
import { app } from "./app";
import { sequelize } from "./config/database";
import { env } from "./config/env";

async function startServer() {
  try {

    defineAssociations();

    await sequelize.authenticate();



    console.log("Conexión con MySQL establecida.");

    //await sequelize.sync();

    await sequelize.sync({ force: true });

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