import { defineAssociations } from "./models/associations.js";
import { app } from "./app.js";
import { sequelize } from "./config/database.js";
import { env } from "./config/env.js";

async function startServer() {
  try {

    defineAssociations();

    await sequelize.authenticate();



    console.log("Conexión con MySQL establecida.");

    //await sequelize.sync();

    // Las tablas las crean las migraciones (npm run db:migrate). Con sync({ force: true })
    // se borrarían las tablas y los datos de los seeders cada vez que arranca el servidor.
    // await sequelize.sync({ force: true });

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