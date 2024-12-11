import Roulette from "../models/roulette.js";
import Bet from "../models/Bet.js";
import { Error } from "mongoose";

export async function getRoulette() {
  try {
    const roulette = await Roulette.find();
    return roulette;
  } catch (error) {
    throw new Error(error.message);
  }
}


export async function createNewRoulette({ id }) {
  try {
    const newRoulette = new Roulette({ id });
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
      rouletteId: roulette.id,
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

export async function cerrarRuleta(rouletteId) {
  try {
    const roulette = await Roulette.findOne({ id: rouletteId, Status: true });
    if (!roulette) {
      throw new Error("Ruleta no encontrada o no está abierta");
    }

    const winningNumber = Math.floor(Math.random() * 37);

    const bets = await Bet.find({ rouletteId: roulette.id });
    const results = bets.map((bet) => {
      let payout = 0;
      if (bet.betType === "number" && bet.betValue === winningNumber) {
        payout = bet.amount * 5; // 5 veces el dinero apostado
      } else if (
        bet.betType === "color" &&
        ((bet.betValue === "negro" && winningNumber % 2 === 0) ||
          (bet.betValue === "rojo" && winningNumber % 2 !== 0))
      ) {
        payout = bet.amount * 1.8; // 1.8 veces el dinero apostado
      }

      return {
        userId: bet.userId,
        betType: bet.betType,
        betValue: bet.betValue,
        amount: bet.amount,
        payout,
      };
    });

    roulette.Status = false;
    await roulette.save();

    return {
      winningNumber,
      results,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
