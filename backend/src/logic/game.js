import { gameStateEnum } from "./enum.js";
import { Player } from "./player.js";

export class Game {
  #gameState = null;
  #player1 = null;
  #player2 = null;
  #result = null;

  constructor() {
    this.#gameState = "waiting";
  }

  getGameStates() {
    return this.#gameState;
  }

  updateGameState(state) {
    if (!this.#player1 || !this.#player2) {
      this.#gameState = "waiting";
      return;
    }

    if (!gameStateEnum.includes(state)) {
      console.log("error: invalid game state");
      return;
    }
    this.#gameState = state;
  }

  createPlayer(id) {
    if (!this.#player1) {
      this.#player1 = new Player(id);
    } else if (!this.#player2) {
      this.#player2 = new Player(id);
      this.updateGameState("playing");
    } else {
      console.log("error: players're full");
    }
  }

  getPlayerById(id) {
    if (this.#player1 && this.#player1.getId() == id) {
      return this.#player1;
    } else if (this.#player2 && this.#player2.getId() == id) {
      return this.#player2;
    } else {
      console.log("error: player not found");
      return null;
    }
  }

  setPlayerChoice(id, choice) {
    const player = this.getPlayerById(id);

    //check errors
    if (!player) {
      return;
    }

    if (this.#gameState != "playing") {
      console.log("error: don't in playing state");
      return;
    }

    if (player.getChoice()) {
      console.log("error: player have select choice");
      return;
    }

    //set player choice
    player.setChoice(choice);

    //check winner
    const choice1 = this.#player1.getChoice();
    const choice2 = this.#player2.getChoice();
    if (!choice1 || !choice2) {
      return;
    }

    if (
      (choice1 === "rock" && choice2 === "scissors") ||
      (choice1 === "paper" && choice2 === "rock") ||
      (choice1 === "scissors" && choice2 === "paper")
    ) {
      this.#result = "player1";
      this.#player1.setScore(this.#player1.getScore() + 1);
    } else if (choice1 == choice2) {
      this.#result = "draw";
    } else {
      this.#result = "player2";
      this.#player2.setScore(this.#player2.getScore() + 1);
    }

    if (this.#player1.getScore() == 3 || this.#player2.getScore() == 3) {
      this.updateGameState("round_end");
      let player =
        this.#player1.getScore() > this.#player2.getScore()
          ? this.#player1
          : this.#player2;
      player.setPoint(player.getPoint() + 1);

      return;
    }

    this.updateGameState("break");
  }

  getResult() {
    return this.#result;
  }

  resumeGame() {
    if (this.#gameState != "break") {
      console.log("error: game is not in break state");
      return;
    }

    this.#player1.resetChoice();
    this.#player2.resetChoice();
    this.#result = null;

    this.updateGameState("playing");
  }

  startNewRound() {
    if (this.#gameState != "round_end") {
      console.log("error: cannot start new round, invalid game state");
      return;
    }

    this.#player1.resetRoundStates();
    this.#player2.resetRoundStates();
    this.#result = null;

    this.updateGameState("playing");
  }

  endGame() {
    if (this.#gameState != "round_end") {
      console.log("error: cannot end game, invalid game state");
      return;
    }

    this.updateGameState("end");
  }
  
  getGameField() {
    return {
      gameState: this.#gameState,
      player1: this.#player1?.getPlayerStates(),
      player2: this.#player2?.getPlayerStates(),
      result: this.#result,
    };
  }
}
