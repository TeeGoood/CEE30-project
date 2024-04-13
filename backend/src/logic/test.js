import { Game } from "./game.js";

/* console.log("test: create game");
const game = new Game();
console.log(game.getGameField());
console.log();

console.log("test: create 1 player");
game.createPlayer("1");
console.log(game.getGameField());
console.log();

console.log("test: create 2 player");
game.createPlayer("2");
console.log(game.getGameField());
console.log();

console.log("test: undefinded choice ");
game.setPlayerChoice("1", "gun");
console.log();

console.log("test: player2 win");
game.setPlayerChoice("1", "scissors");
game.setPlayerChoice("2", "rock");
console.log(game.getGameField());
console.log();

console.log("test: set player choice when break");
game.setPlayerChoice("1", "rock");
console.log(game.getGameField());
console.log();

console.log("test: resume game");
game.resumeGame();
console.log(game.getGameField());
console.log();

console.log("test: end game when not in break state");
game.endGame();
console.log(game.getGameField());
console.log();

console.log("test:  endgame when break");
game.setPlayerChoice("1", "scissors");
game.setPlayerChoice("2", "rock");
game.resumeGame();
game.setPlayerChoice("1", "scissors");
game.setPlayerChoice("2", "rock");
//game.startNewRound();
game.endGame();
console.log(game.getGameField());
console.log(); */

//create game
const game = new Game();
game.createPlayer("1");
game.createPlayer("2");
game.playerDrawCard("1", false, false);
game.setPlayerChoice("1", "rock");
game.setPlayerChoice("2", "scissors");

game.playerDrawCard("2", false, false);
game.setPlayerChoice("1", "rock");
game.setPlayerChoice("2", "scissors");

game.playerDrawCard("1", false, false);
game.setPlayerChoice("1", "rock");
game.setPlayerChoice("2", "scissors");

console.log(game.getGameField());
