import express from "express";
import ruletaRouter from "./ruletaRouter.js"
const router = express.Router();

// Define tus rutas y asegúrate de pasar funciones de middleware válidas 
router.use('/ruleta', ruletaRouter); 
export default router;