import express from "express"
import Roulette from "../models/roulette.js"
import { createNewRoulette } from "../services/rouletteService.js";
export async function createRoulette (req, res)  {
    try{
        const newRoulette = new Roulette();
        await newRoulette.save();
        res.status(201).json({_id: newRoulette._id});
         }catch (error){
           console.error('Error creating roulette:', error); res.status(500).json({ message: 'Internal Server Error'})
         }

}
