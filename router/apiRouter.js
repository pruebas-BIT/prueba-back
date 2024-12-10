import express from "express";
import rouletteRouter from "./rouletteRouter.js";
const router = express.Router();

router.use("/roulette", rouletteRouter);

export default router;