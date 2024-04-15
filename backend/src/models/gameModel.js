import mongoose, { Schema } from "mongoose";
import { gameStatesEnum, resultsEnum } from "../logic/enum.js";

const gameSchema = new mongoose.Schema(
  {
    gameState: {
      type: String,
      //required: true,
      enum: gameStatesEnum,
    },
    player1: {
      type: Schema.Types.ObjectId,
      //required: true,
    },
    player2: {
      type: Schema.Types.ObjectId,
      //required: true,
    },
    result: {
      type: String,
      //required: true,
      enum: [...resultsEnum, null]
    },
    round: {
      type: Number,
      //required: true,
      min: 0,
    },
    cardDec: {
      type: [String],
    }
  },
);

const GameModel = mongoose.model("game", gameSchema);

export default GameModel;
