import express from "express";
import { createRoulette, open, createBet } from "../controller/rouletteController.js";

const router = express.Router();

router.post("/create-roulette", createRoulette);
router.post("/create-bet", createBet)
router.put("/abrir/:id", open);

export default router;
