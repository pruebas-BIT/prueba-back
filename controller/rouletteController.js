import express from "express"
import Roulette from "../models/roulette.js"
// import { createNewRoulette } from "../services/rouletteService.js";
// export async function createRoulette (req, res)  {
//     try{
      
//         const newRoulette = new Roulette(id, Status);
//         const { id, Status } = req.body;
//         await newRoulette.save();
//         res.status(201).json({id: newRoulette.id});
//          }catch (error){
//            console.error('Error creating roulette:', error); res.status(500).json({ message: 'Internal Server Error'})
//          }

// }

import { createNewRoulette } from '../services/rouletteService.js';

export async function createRoulette(req, res) {
  try {
    const { id, Status } = req.body;
    const newRouletteId = await createNewRoulette({ id, Status });
    res.status(201).json({ id: newRouletteId });
  } catch (error) {
    console.error('Error creating roulette:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

