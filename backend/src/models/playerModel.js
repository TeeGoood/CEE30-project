import mongoose from "mongoose";
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
