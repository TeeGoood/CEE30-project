import mongoose from "mongoose";
import { gameStateEnum, resultEnum } from "../logic/enum";

const gameSchema = new mongoose.Schema({
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
    enum: resultEnum,
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

const Game = mongoose.model("game", gameSchema);

export default Game;
