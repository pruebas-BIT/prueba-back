import Roulette from "../models/roulette.js";

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
      return { exito: false, codigo: 404, mensaje: 'Ruleta no encontrada' };
    }
    if (ruleta.Status === true) {
      return {
        exito: false,
        codigo: 400,
        mensaje: 'La ruleta ya está abierta',
      };
    }
    ruleta.Status = true;
    await ruleta.save();
    return { exito: true, mensaje: 'Ruleta abierta exitosamente' };
  } catch (error) {
    console.error('Error al abrir la ruleta:', error);
    return { exito: false, codigo: 500, mensaje: 'Error interno del servidor' };
  }
};
