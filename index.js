
import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './database/mongoConnect.js';
import apiRouter from './router/apiRouter.js';
import cors from 'cors';

const app = express();

// Configuración de variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDatabase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use('', apiRouter);  // Usa un prefijo adecuado para las rutas de la API

// Iniciando el servidor
const port = process.env.PORT || 5020;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

// Exportar la aplicación
export default app;
