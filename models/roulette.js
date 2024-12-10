import {Schema, model} from "mongoose";

const rouletteSchema = Schema({
    Status:{
        type:String,
        default:`OFF`,
        require: true
    }
});


const Roulette = model("Roulette", rouletteSchema)

export default Roulette; 