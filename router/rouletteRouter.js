import express from "express";
import { createRoulette, open } from "../controller/rouletteController.js";

const router = express.Router();

router.post("/create-roulette", createRoulette);
// Endpoint para abrir una ruleta
router.put("/abrir/:id", open);

export default router;
