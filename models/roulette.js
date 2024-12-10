import { Schema, model } from "mongoose";

const rouletteSchema = Schema({
  id: { type: Number, require: true },

  Status: {
    type: Boolean,
    default: false,
    require: true,
  },
});

const Roulette = model("Roulette", rouletteSchema);

export default Roulette;
