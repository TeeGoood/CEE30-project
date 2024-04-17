import { cardsEnum, choicesEnum } from "./enum.js";

export class Card {
  #name;
  #description;
  #isForce;
  #game;
  #player;

  constructor(data = {}) {
    //required valid name and game object
    if (!data.name) {
      throw "not given card's name";
    }

    if (!data.game) {
      throw "not given card's game";
    }

    if (!(data.name in cardsEnum)) {
      throw "invalid card name";
    }

    this.#name = data.name;
    this.#description = cardsEnum[data.name].description;
    this.#isForce = cardsEnum[data.name].isForce;
    this.#game = data.game;
    this.#player = data.player || null;
  }

  preSkill() {
    cardsEnum[this.#name].preSkill(this.#game, this.#player);
  }

  postSkill() {
    cardsEnum[this.#name].postSkill(this.#game, this.#player);
  }

  getName() {
    return this.#name;
  }

  getIsForce() {
    return this.#isForce;
  }

  getPlayer(){
    return this.#player;
  }

  setPlayer(player) {
    this.#player = player;
  }

  getStates() {
    return {
      name: this.#name,
      description: this.#description,
      isForce: this.#isForce,
    };
  }
}
