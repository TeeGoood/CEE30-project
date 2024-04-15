import mongoose, { Schema } from "mongoose";
import { cardsEnum } from "../logic/enum.js";

const cardSchema = new mongoose.Schema(
  {
    name: {
      types: String,
      //required: true,
      enum: Object.keys(cardsEnum),
    },
    description: {
      types: String,
      //required: true,
    },
    isUse: {
      types: Boolean,
      //required: true,
    },
    isForce: {
      types: Boolean,
      //required: true,
    },
  },
);


export default cardSchema;
