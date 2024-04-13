import mongoose from "mongoose";
import { gameStateEnum } from "../logic/enum";

const playerSchema = new mongoose.Schema({
  gameState: {
    type: String,
    required: true,
    enum: gameStateEnum,
  },
  player1: {
    type: String,
    required: true,
  },
  player2: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
    enum: resultE
  },
  round: {
    type: Number,
    required: true,
    min: 0
  },
  MAX_ROUND: {
    type: Number,
    required: true,
    min: 3
  }
});

const Player = mongoose.model("player", playerSchema);

export default Player;
