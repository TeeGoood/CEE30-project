import mongoose from "mongoose";
<<<<<<< HEAD
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
=======
import { cardsEnum, choicesEnum } from "../logic/enum.js";

const playerSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      //required: true,
      min: 1,
      max: 2,
    },
    score: {
      type: Number,
      //required: true,
      min: 0,
    },
    quota: {
      type: Number,
      //required: true,
      min: 0,
    },
    choice: {
      type: String,
      //required: true,
      //enum: [...choicesEnum, null]
    },
    card: {
      type: String,
      //required: true,
      //enum: Object.keys(cardsEnum)
    },
    availableChoices: {
      type: [String],
      //required: true,
    },
  },
);

const PlayerModel = mongoose.model("player", playerSchema);

export default PlayerModel;
>>>>>>> main
