import Roulette from "../models/roulette.js";
import Bet from "../models/Bet.js";
import { Error } from "mongoose";

export async function createNewRoulette({ id, Status }) {
  try {
    const newRoulette = new Roulette({ id, Status });
    await newRoulette.save();
    return newRoulette.id;
  } catch (error) {
    console.error("Error creating roulette:", error);
    throw new Error("Internal server error");
  }
}

export const abrirRuleta = async (id) => {
  try {
    const ruleta = await Roulette.findOne({ id: Number(id) });
    if (!ruleta) {
      return { exito: false, codigo: 404, mensaje: "Ruleta no encontrada" };
    }
    if (ruleta.Status === true) {
      return {
        exito: false,
        codigo: 400,
        mensaje: "La ruleta ya está abierta",
      };
    }
    ruleta.Status = true;
    await ruleta.save();
    return { exito: true, mensaje: "Ruleta abierta exitosamente" };
  } catch (error) {
    console.error("Error al abrir la ruleta:", error);
    return { exito: false, codigo: 500, mensaje: "Error interno del servidor" };
  }
};

export async function crearApuesta({
  rouletteId,
  userId,
  amount,
  betType,
  betValue,
}) {
  try {
    const roulette = await Roulette.findOne({ id: rouletteId, Status: true });
    if (!roulette) {
      throw new Error("Ruleta no ha sido encontrada o no esta activa");
    }
    if (amount > 10000) {
      throw new Error("el monto no puede ser mayor a 10.000");
    }
    if (betType === "number" && (betValue < 0 || betValue > 36)) {
      throw new Error("numero de apuesta incorrecto");
    }
    if (betType === "color" && ["negro", "rojo"].includes(betValue)) {
      throw new Error("color de la apuesta invalido");
    }

    const bet = new Bet({
      rouletteId: roulette._id,
      userId,
      amount,
      betType,
      betValue,
    });
    await bet.save();
    return bet;
  } catch (error) {
    throw new Error(error.message);
  }
}
