import express from "express";
import rouletteRouter from "./rouletteRouter.js";
const router = express.Router();

// Define tus rutas y asegúrate de pasar funciones de middleware válidas 
router.use("/roulette", rouletteRouter);

export default router;