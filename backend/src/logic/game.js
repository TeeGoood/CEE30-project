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
    new Card(this, "Score_Swap"),
    new Card(this, "Ground_Zero"),
    new Card(this, "Even_Odds"),
    new Card(this, "Escalating_The_Loss"),
    new Card(this, "Rock_You"),
    new Card(this, "Makeit_Or_Breakit"),
    new Card(this, "OneMoreTime"),
    new Card(this, "Paper_Loss"),
    new Card(this, "Late_Game"),
  ]; //TODO

  constructor(gameStatus = {}) {
    this.#gameState = gameStatus.gameState || "waiting";
    this.#player1 = gameStatus.player1 || null;
    this.#player2 = gameStatus.player2 || null;
    this.#result = gameStatus.result || null;
    this.#round = gameStatus.round || 1;
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
      console.log("error: invalid game state");
      return;
    }
    this.#gameState = state;
  }

  createPlayer(id) {
    if (!this.#player1) {
      this.#player1 = new Player(id, 1);
    } else if (!this.#player2) {
      this.#player2 = new Player(id, 2);
      this.updateGameState("card_select");
    } else {
      console.log("error: players are full");
    }
  }

  getPlayerById(id) {
    if (this.#player1?.getId() == id) {
      return this.#player1;
    } else if (this.#player2?.getId() == id) {
      return this.#player2;
    } else {
      console.log(`error: cannot find player ${id}`);
      return null;
    }
  }

  setPlayerChoice(id, choice) {
    const player = this.getPlayerById(id);

    //check errors
    if (!player) {
      return;
    }

    if (this.#gameState != "choice_select") {
      console.log("error: not in choice_select state");
      return;
    }

    if (player.getChoice()) {
      console.log("error: player already have selected choice");
      return;
    }

    //set player choice
    if(!player.getAvailableChoice().includes(choice)){
      console.log('not available choice');
      return;
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
    if (card?.getIsUse()) {
      card.postSkill();
    } else {
      this.checkWinner(choice1, choice2);
    }
    this.stopGame();
  }

  resumeGame(){
    if (this.#player1.getScore() >= 3 || this.#player2.getScore() >= 3) {
      this.endGame();
    } else {
      this.startNewRound();
    }
  }

  stopGame() {
    this.updateGameState("break");
    //this.resumeGame();
  }
  
  startNewRound(){
    if (this.#gameState != "break") {
      console.log("error: game is in invalid game state");
      return;
    }
    
    this.#round += 1;
    this.#player1.resetRoundState();
    this.#player2.resetRoundState();
    this.#result = null;

    this.updateGameState("card_select");
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
      console.error("error: not player1 round");
      return;
    }

    if (player.getNumber() == 2 && this.#round % 2 != 0) {
      console.error("error: not player2 round");
      return;
    }

    this.#gameState = "choice_select";

    if (!isDraw) {
      return;
    }

    const card = this.#cardDec[this.#cardDec.length - 1];
    card.setPlayer(player);
    player.setCard(card);
    player.setQuota(player.getQuota() - 1);
    this.#cardDec.splice(this.#cardDec.length - 1, 1);

    const playerCard = player.getCard();
    playerCard.setIsUse(isUse || playerCard.getIsForce());

    if (playerCard.getIsUse()) {
      player.getCard().preSkill();
    }
  }

  endGame() {
    if (this.#gameState != "break") {
      console.log("error: cannot end game, invalid game state");
    }

    this.updateGameState("game_end");
  }

  getResult() {
    return this.#result;
  }

  setResult(result) {
    if (!resultsEnum.includes(result)) {
      console.error("error: invalid result");
      return;
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

  getGameField() {
    return {
      gameState: this.#gameState,
      player1: this.#player1?.getPlayerStates(),
      player2: this.#player2?.getPlayerStates(),
      result: this.#result,
      round: this.#round,
      cardDec: this.#cardDec,
    };
  }
}
