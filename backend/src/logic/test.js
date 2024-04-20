<<<<<<< HEAD
=======
import GameModel from "../models/gameModel.js";
>>>>>>> main
import { Game } from "./game.js";

//create game
const game = new Game();
<<<<<<< HEAD
game.createPlayer("1");
game.createPlayer("2");
=======
game.createPlayer({id: '1', number: 1});
game.createPlayer({id: '2', number: 2});
>>>>>>> main

//no card
game.playerDrawCard("1", false, false);
game.setPlayerChoice("1", "rock");
game.setPlayerChoice("2", "scissors");

game.resumeGame();

<<<<<<< HEAD
//Paper_Loss 
// game.playerDrawCard("1", true, true);
// game.setPlayerChoice("1", "scissors");
// game.setPlayerChoice("2", "paper");

//OneMoreTime
// game.playerDrawCard("1", true, true);
// game.setPlayerChoice("1", "paper");
// game.setPlayerChoice("2", "scissors");

//Makeit_Or_Breakit
// game.playerDrawCard("1", true, true);
// game.setPlayerChoice("1", "rock");
// game.setPlayerChoice("2", "scissors");

//Rock_You
// game.playerDrawCard("1", true, true);
// game.setPlayerChoice("1", "scissors");
// game.setPlayerChoice("2", "rock");

// //Late_Game
// game.playerDrawCard("1", true, true);
// game.setPlayerChoice("1", "rock");
// game.setPlayerChoice("2", "scissors");

//Escalating_The_Loss
// game.playerDrawCard("2", true, true);
// game.setPlayerChoice("1", "scissors");
// game.setPlayerChoice("2", "rock");

// //Even_Odds
// game.playerDrawCard("2", true, true);
// game.setPlayerChoice("1", "rock");
// game.setPlayerChoice("2", "scissors");

//Ground_Zero
// game.playerDrawCard("2", true, true);
// game.setPlayerChoice("1", "rock");
// game.setPlayerChoice("2", "scissors");

//Score_Swap
game.playerDrawCard("2", true, true);
game.setPlayerChoice("1", "rock");
game.setPlayerChoice("2", "scissors");



console.log(game.getGameField());
=======
//Score_Swap
game.playerDrawCard("2", true, false);
game.setPlayerChoice("1", "rock");
game.setPlayerChoice("2", "scissors");

console.log(game.getShowStates());


>>>>>>> main
