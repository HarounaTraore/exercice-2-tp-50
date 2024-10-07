import express from "express";
import router from "./src/validators/validator.js";
import { sequelize } from "./src/config/db.js";

const app = express();
app.use("/", router);
app.use(express.json());
const port = 3000;
const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("Base de données synchronisée.");

    app.listen(port, () => {
      console.log("Serveur démarré sur http://localhost:3000");
    });
  } catch (error) {
    console.error(
      "Erreur lors de la synchronisation avec la base de données :",
      error
    );
  }
};

startServer();
