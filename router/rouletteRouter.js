import express from "express";
import{createRoulette} from "../controller/rouletteController.js"

const router = express.Router();

router.post("/create-roulette", createRoulette);

export default router;