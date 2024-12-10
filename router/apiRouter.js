import express from "express";
import ruletaRouter from "./ruletaRouter.js"
import rouletteRouter from "./rouletteRouter.js";
const router = express.Router();

// Define tus rutas y asegúrate de pasar funciones de middleware válidas 
router.use('/ruleta', ruletaRouter); 
router.use("/roulette", rouletteRouter);

export default router;