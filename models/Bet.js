import mongoose from 'mongoose';

const betSchema = new mongoose.Schema({
  rouletteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roulette',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    max: 10000,
  },
  betType: {
    type: String,
    enum: ['number', 'color'],
    required: true,
  },
  betValue: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  }
});

const Bet = mongoose.model('Bet', betSchema);

export default Bet;
