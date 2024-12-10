import Roulette from "../models/roulette.js";

export async function createNewRoulette({ id, Status }) {
  try {
    const newRoulette = new Roulette({ id, Status });
    await newRoulette.save();
    return newRoulette.id;  
  } catch (error) {
    console.error('Error creating roulette:', error);
    throw new Error('Internal server error');
  }
}
