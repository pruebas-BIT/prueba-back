import express from "express";
import {
  createRoulette,
  open,
  createBet,
  rouletteClose,
  getAllRoulette,
} from "../controller/rouletteController.js";

const router = express.Router();

router.get("/get-roulette", getAllRoulette);
router.post("/create-roulette", createRoulette);
router.post("/create-bet", createBet);
router.put("/abrir/:id", open);
router.put("/close/:rouletteId", rouletteClose);

export default router;
