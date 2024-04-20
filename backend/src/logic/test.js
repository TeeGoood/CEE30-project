import GameModel from "../models/gameModel.js";
import { Game } from "./game.js";

//create game
const game = new Game();
game.createPlayer({id: '1', number: 1});
game.createPlayer({id: '2', number: 2});

//no card
game.playerDrawCard("1", false, false);
game.setPlayerChoice("1", "rock");
game.setPlayerChoice("2", "scissors");

game.resumeGame();

//Score_Swap
game.playerDrawCard("2", true, false);
game.setPlayerChoice("1", "rock");
game.setPlayerChoice("2", "scissors");

console.log(game.getShowStates());


