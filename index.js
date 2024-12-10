import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./database/mongoConnect.js";
import apiRouter from "./router/apiRouter.js";
import cors from "cors";

const app = express();

//configuracion de variables de entorno
dotenv.config();

//conectar a la base de datos
connectDatabase();

//rutas
app.use("", apiRouter);

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//iniciando el servidor
const port = process.env.PORT || 5020;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

// exportar la aplicacion
export default app;
