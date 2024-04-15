import { Card } from "./card.js";
import { gameStatesEnum, resultsEnum } from "./enum.js";
import { Player } from "./player.js";

export class Game {
  #gameState;
  #player1;
  #player2;
  #result;
  #round;
  #cardDec = [
    new Card({
      game: this,
      name: "Score_Swap",
    }),
    new Card({
      game: this,
      name: "Ground_Zero",
    }),
    new Card({
      game: this,
      name: "Even_Odds",
    }),
    new Card({
      game: this,
      name: "Escalating_The_Loss",
    }),
    new Card({
      game: this,
      name: "Rock_You",
    }),
    new Card({
      game: this,
      name: "Makeit_Or_Breakit",
    }),
    new Card({
      game: this,
      name: "OneMoreTime",
    }),
    new Card({
      game: this,
      name: "Paper_Loss",
    }),
    new Card({
      game: this,
      name: "Late_Game",
    }),
  ];

  constructor(gameStatus = {}) {
    this.#gameState = gameStatus.gameState || "waiting";
    this.#player1 = gameStatus.player1 || null;
    this.#player2 = gameStatus.player2 || null;
    this.#result = gameStatus.result || null;
    this.#round = gameStatus.round || 1;
  }

  resetGameStates(){
    this.#gameState = "waiting";
    this.#player1 = null;
    this.#player2 = null;
    this.#result = null;
    this.#round = 1;
  }

  getGameStates() {
    return this.#gameState;
  }

  updateGameState(state) {
    if (!this.#player1 || !this.#player2) {
      this.#gameState = "waiting";
      return;
    }

    if (!gameStatesEnum.includes(state)) {
      throw "invalid game state";
    }
    this.#gameState = state;
  }

  createPlayer(data) {
    if (!this.#player1) {
      this.#player1 = new Player({...data, number: 1});
    } else if (!this.#player2) {
      this.#player2 = new Player({...data, number: 2});
      this.updateGameState("card_select");
    } else {
      throw "game are full";
    }
  }

  getPlayerById(id) {
    if (this.#player1?.getId() == id) {
      return this.#player1;
    } else if (this.#player2?.getId() == id) {
      return this.#player2;
    } else {
      throw `player ${id} is not in this game`;
    }
  }

  setPlayerChoice(id, choice) {
    const player = this.getPlayerById(id);

    //check errors
    if (!player) {
      return;
    }

    if (this.#gameState != "choice_select") {
      throw "cannot set choice, invalid game state";
    }

    if (player.getChoice()) {
      throw `player ${id} have already selected choice`;
    }

    //set player choice
    if (!player.getAvailableChoice().includes(choice)) {
      throw "not available choice";
    }
    player.setChoice(choice);

    //check winner
    const choice1 = this.#player1.getChoice();
    const choice2 = this.#player2.getChoice();
    if (!choice1 || !choice2) {
      return;
    }

    const card1 = this.#player1.getCard();
    const card2 = this.#player2.getCard();
    const card = card1 || card2;
    if (card?.getIsForce() || card?.player.isUse()) {
      card.postSkill();
    } else {
      this.checkWinner(choice1, choice2);
    }
    this.stopGame();
  }

  stopGame() {
    this.updateGameState("break");
  }

  resumeGame() {
    if (this.#player1.getScore() >= 3 || this.#player2.getScore() >= 3) {
      this.endGame();
    } else {
      this.startNewRound();
    }
  }

  startNewRound() {
    if (this.#gameState != "break") {
      throw "cannot start new Round, invalid game state";
    }

    this.#round += 1;
    this.#player1.resetRoundState();
    this.#player2.resetRoundState();
    this.#result = null;

    this.updateGameState("card_select");
  }

  endGame() {
    if (this.#gameState != "break") {
      throw "cannot end game, invalid game state";
    }

    this.updateGameState("game_end");
  }

  checkWinner(choice1, choice2) {
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
  }

  playerDrawCard(id, isDraw, isUse) {
    const player = this.getPlayerById(id);

    if (player.getNumber() == 1 && this.#round % 2 == 0) {
      throw "not player1 round";
    }

    if (player.getNumber() == 2 && this.#round % 2 != 0) {
      throw "not player2 round";
    }

    this.#gameState = "choice_select";

    if (!isDraw) {
      return;
    }

    const card = this.#cardDec[this.#cardDec.length - 1];
    this.#cardDec.splice(this.#cardDec.length - 1, 1);
    
    card.setPlayer(player);

    player.setCard(card);
    player.setQuota(player.getQuota() - 1);
    player.setIsUse(isUse);

    if (card.getIsForce() || player.getIsUse()) {
      card.preSkill();
    }
  }

  getResult() {
    return this.#result;
  }

  setResult(result) {
    if (!resultsEnum.includes(result)) {
      throw "invaild result";
    }
    this.#result = result;
  }

  getPlayerByNumber(number) {
    if (number == 1) {
      return this.#player1;
    } else {
      return this.#player2;
    }
  }

  getShowStates() {
    return {
      gameState: this.#gameState,
      player1: this.#player1?.getShowStates(),
      player2: this.#player2?.getShowStates(),
      result: this.#result,
      round: this.#round,
      cardDec: this.#cardDec.map(card => card.getName()),
    };
  }

  getDatabaseStates() {
    return {
      gameState: this.#gameState,
      player1: this.#player1?.getId(),
      player2: this.#player2?.getId(),
      result: this.#result,
      round: this.#round,
      cardDec: this.#cardDec.map(card => card.getName()),
    };
  }
}
