import express from "express";
import Roulette from "../models/roulette.js";
import { createNewRoulette, abrirRuleta } from "../services/rouletteService.js";


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
    console.error('Error al abrir la ruleta:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}


