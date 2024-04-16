import "dotenv/config";
import "./config/db.js";

import app from "./app.js";
import { Game } from "./logic/game.js";
import GameModel from "./models/gameModel.js";
import mongoose from "mongoose";
import { databaseToObject } from "./logic/utilities.js";

// This is for maintaining the server.
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  console.log(err.stack);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(`${err}`);
  server.close(() => {
    process.exit(1);
  });
});

const PORT = 3222;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend Server ready at http://localhost:${PORT}`);
});

/* const game = new Game();
const p1 = new mongoose.Types.ObjectId();
const p2 = new mongoose.Types.ObjectId();

game.createPlayer({id: p1});
game.createPlayer({id: p2});

//no card
game.playerDrawCard(p1, false, false);
game.setPlayerChoice(p1, "rock");
game.setPlayerChoice(p2, "scissors");

game.resumeGame();

//Score_Swap
game.playerDrawCard(p2, true, false);
game.setPlayerChoice(p1, "rock");
game.setPlayerChoice(p2, "scissors");

console.log(game.getShowStates());
const gameModel = new GameModel(game.getDatabaseStates());
gameModel.save(); */

(async () => {
  const gameData = await GameModel.findOne({});
  const gameObject = await databaseToObject(gameData);
  console.log(gameObject);
  console.log(gameObject.getShowStates());  
})();

