import { Card } from "./card.js";
import { gameStatesEnum, resultsEnum } from "./enum.js";
import { Player } from "./player.js";

export class Game {
  #gameState;
  #player1;
  #player2;
  #result;
  #round;
<<<<<<< HEAD
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
=======
  #cardDec;

  constructor(gameStatus = {}) {
    //console.log(gameStatus);
    this.#gameState = gameStatus.gameState || "waiting";
    //console.log(this.#gameState);
    this.#player1 = null;
    this.#player2 = null;
    this.#result = gameStatus.result || null;
    this.#round = gameStatus.round || 1;
    this.#cardDec = (
      gameStatus.cardDec || [
        "Late_Game",
        "Paper_Loss",
        "OneMoreTime",
        "Makeit_Or_Breakit",
        "Rock_You",
        "Escalating_The_Loss",
        "Even_Odds",
        "Ground_Zero",
        "Score_Swap",
      ]
    ).map(
      (card) =>
        new Card({
          game: this,
          name: card,
        })
    );
  }

  resetGameStates() {
    this.#gameState = "waiting";
    this.#player1 = null;
    this.#player2 = null;
    this.#result = null;
    this.#round = 1;
    this.#cardDec = [
      "Late_Game",
      "Paper_Loss",
      "OneMoreTime",
      "Makeit_Or_Breakit",
      "Rock_You",
      "Escalating_The_Loss",
      "Even_Odds",
      "Ground_Zero",
      "Score_Swap",
    ].map(
      (card) =>
        new Card({
          game: this,
          name: card,
        })
    );
>>>>>>> main
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
<<<<<<< HEAD
      console.log("error: invalid game state");
      return;
=======
      throw "invalid game state";
>>>>>>> main
    }
    this.#gameState = state;
  }

<<<<<<< HEAD
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

=======
  createPlayer(data) {
    if (!this.#player1) {
      this.setPlayer1(data);
      return this.#player1;
    } else if (!this.#player2) {
      this.setPlayer2(data);
      this.updateGameState("card_select");
      return this.#player2;
    } else {
      throw "game are full";
    }
  }

  setPlayer1(data) {
    data.game = this;
    data.number = 1;
    this.#player1 = new Player(data);
  }

  setPlayer2(data) {
    data.game = this;
    data.number = 2;
    this.#player2 = new Player(data);
  }

>>>>>>> main
  getPlayerById(id) {
    if (this.#player1?.getId() == id) {
      return this.#player1;
    } else if (this.#player2?.getId() == id) {
      return this.#player2;
    } else {
<<<<<<< HEAD
      console.log(`error: cannot find player ${id}`);
      return null;
=======
      throw `player ${id} is not in this game`;
>>>>>>> main
    }
  }

  setPlayerChoice(id, choice) {
    const player = this.getPlayerById(id);
<<<<<<< HEAD
=======
    //console.log(this.getShowStates());
>>>>>>> main

    //check errors
    if (!player) {
      return;
    }

    if (this.#gameState != "choice_select") {
<<<<<<< HEAD
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
=======
      throw "cannot set choice, invalid game state";
    }

    if (player.getChoice()) {
      throw `player ${id} have already selected choice`;
    }

    //set player choice
    if (!player.getAvailableChoice().includes(choice)) {
      throw "not available choice";
>>>>>>> main
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
<<<<<<< HEAD
    if (card?.getIsUse()) {
=======
    if (card?.getIsForce() || card?.getPlayer().getIsUse()) {
>>>>>>> main
      card.postSkill();
    } else {
      this.checkWinner(choice1, choice2);
    }
    this.stopGame();
  }

<<<<<<< HEAD
  resumeGame(){
=======
  stopGame() {
    this.updateGameState("break");
    //this.resumeGame();
  }

  resumeGame() {
>>>>>>> main
    if (this.#player1.getScore() >= 3 || this.#player2.getScore() >= 3) {
      this.endGame();
    } else {
      this.startNewRound();
    }
  }

<<<<<<< HEAD
  stopGame() {
    this.updateGameState("break");
    //this.resumeGame();
  }
  
  startNewRound(){
    if (this.#gameState != "break") {
      console.log("error: game is in invalid game state");
      return;
    }
    
=======
  startNewRound() {
    if (this.#gameState != "break") {
      throw "cannot start new Round, invalid game state";
    }

>>>>>>> main
    this.#round += 1;
    this.#player1.resetRoundState();
    this.#player2.resetRoundState();
    this.#result = null;

    this.updateGameState("card_select");
  }

<<<<<<< HEAD
=======
  endGame() {
    if (this.#gameState != "break") {
      throw "cannot end game, invalid game state";
    }

    this.updateGameState("game_end");
  }

>>>>>>> main
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

<<<<<<< HEAD
    if (player.getNumber() == 1 && this.#round % 2 == 0) {
      console.error("error: not player1 round");
      return;
    }

    if (player.getNumber() == 2 && this.#round % 2 != 0) {
      console.error("error: not player2 round");
      return;
=======
    if (this.#gameState != "card_select") {
      throw "not in card_select state";
    }

    if (player.getNumber() == 1 && this.#round % 2 == 0) {
      throw "not player1 round";
    }

    if (player.getNumber() == 2 && this.#round % 2 != 0) {
      throw "not player2 round";
>>>>>>> main
    }

    this.#gameState = "choice_select";

    if (!isDraw) {
      return;
    }

    const card = this.#cardDec[this.#cardDec.length - 1];
<<<<<<< HEAD
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

=======
    this.#cardDec.splice(this.#cardDec.length - 1, 1);

    card.setPlayer(player);

    player.setCard(card);
    player.setQuota(player.getQuota() - 1);
    player.setIsUse(isUse);

    if (card.getIsForce() || player.getIsUse()) {
      card.preSkill();
    }
  }

>>>>>>> main
  getResult() {
    return this.#result;
  }

  setResult(result) {
    if (!resultsEnum.includes(result)) {
<<<<<<< HEAD
      console.error("error: invalid result");
      return;
=======
      throw "invaild result";
>>>>>>> main
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

<<<<<<< HEAD
  getGameField() {
    return {
      gameState: this.#gameState,
      player1: this.#player1?.getPlayerStates(),
      player2: this.#player2?.getPlayerStates(),
      result: this.#result,
      round: this.#round,
      cardDec: this.#cardDec,
=======
  getShowStates() {
    return {
      gameState: this.#gameState,
      player1: this.#player1?.getShowStates(),
      player2: this.#player2?.getShowStates(),
      result: this.#result,
      round: this.#round,
      cardDec: this.#cardDec.map((card) => card.getName()),
    };
  }

  getTopCard() {
    return this.#cardDec[this.#cardDec.length - 1];
  }

  getDatabaseStates() {
    return {
      gameState: this.#gameState,
      player1: this.#player1?.getId() || null,
      player2: this.#player2?.getId() || null,
      result: this.#result,
      round: this.#round,
      cardDec: this.#cardDec.map((card) => card.getName()),
>>>>>>> main
    };
  }
}
