import express from "express";
import cors from "cors";
import { Game } from "./logic/game.js";
import GameModel from "./models/gameModel.js";
import mongoose from "mongoose";
import PlayerModel from "./models/playerModel.js";

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

//test();


export default app;

/* async function test(){
  const game = new Game({});
  game.createPlayer({id: new mongoose.Types.ObjectId()});
  game.createPlayer({id: new mongoose.Types.ObjectId()});
  game.playerDrawCard(game.getPlayerByNumber(1).getId(), true, false);
  console.log(game.getShowStates());
  console.log(game.getDatabaseStates());

  const newGame = new GameModel(game.getDatabaseStates());
  const gameData = await newGame.save();
  const newPlayer1 = new PlayerModel(game.getPlayerByNumber(1).getDatabaseStates());
  const player1Data = await newPlayer1.save();

  console.log(gameData);
  console.log(player1Data);
} */
