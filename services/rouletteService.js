 import Roulette from "../models/roulette.js";

 export async function createNewRoulette({Status}){
    try {
        const newRoulette = new Roulette({Status});
        await newRoulette.save();
        return newRoulette._id;
    }catch (error){
        console.error(`error creating roulette`, error);
        throw new error(`internal server error`)
    }
 }