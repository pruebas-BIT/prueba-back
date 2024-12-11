import express from "express";
import Roulette from "../models/roulette.js";
import {
  createNewRoulette,
  abrirRuleta,
  crearApuesta,
  cerrarRuleta,
  getRoulette,
} from "../services/rouletteService.js";


export async function getAllRoulette(req, res) {
  try {
    const roulettes = await getRoulette();
    if (!roulettes || roulettes.length === 0) {
      return res.status(404).json({ message: 'No roulettes found' });
    }
    res.status(200).json(roulettes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createRoulette(req, res) {
  try {
    const { id, Status } = req.body;
    const newRouletteId = await createNewRoulette({ id, Status });
    res.status(201).json({ id: newRouletteId });
  } catch (error) {
    console.error("Error creating roulette:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function open(req, res) {
  try {
    const { id } = req.params;
    const result = await abrirRuleta(id);
    if (result.exito) {
      res.status(200).json({ mensaje: result.mensaje });
    } else {
      res.status(result.codigo).json({ mensaje: result.mensaje });
    }
  } catch (error) {
    console.error("Error al abrir la ruleta:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
}

export async function createBet(req, res) {
  try {
    const { rouletteId, userId, amount, betType, betValue } = req.body;
    const bet = await crearApuesta({
      rouletteId,
      userId,
      amount,
      betType,
      betValue,
    });
    res.status(201).json(bet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function rouletteClose(req, res) {
  try {
    const { rouletteId } = req.params;
    const result = await cerrarRuleta(rouletteId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
