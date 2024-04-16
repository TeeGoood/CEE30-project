import { Card } from "./card.js";
import { choicesEnum } from "./enum.js";

export class Player {
  #id;
  #number;
  #quota;
  #score;
  #choice;
  #game;
  #card;
  #isUse;
  #availableChoices;

  constructor(data = {}) {
    if (!data.id) {
      throw "not given id";
    }

    if (!data.game) {
      throw "not given game";
    }

    if (!data.number) {
      throw "not given number";
    }

    this.#id = data.id;
    this.#number = data.number || number;
    this.#score = data.score || 0;
    this.#quota = data.quota || 2;
    this.#choice = data.choice || null;
    this.#game = data.game;
    this.#card = data.card
      ? new Card({ name: data.card, Player: this, game: this.#game })
      : null;
    this.#isUse = data.isUse || false;
    this.#availableChoices = data.availableChoices || choicesEnum;
  }

  resetRoundState() {
    this.#choice = null;
    this.#card = null;
    this.#isUse = false;
    this.#availableChoices = choicesEnum;
  }

  getId() {
    return this.#id;
  }

  getNumber() {
    return this.#number;
  }

  setNumber(number) {
    if (number != 1 || number != 2) {
      throw "invalid player number";
    }
  }

  getQuota() {
    return this.#quota;
  }

  setQuota(quota) {
    this.#quota = quota;
    if (this.#quota < 0) {
      this.#quota = 0;
    }
  }

  getScore() {
    return this.#score;
  }

  setScore(score) {
    this.#score = score;
    if (this.#score < 0) {
      this.#score = 0;
    }
  }

  getChoice() {
    return this.#choice;
  }

  setChoice(choice) {
    if (choicesEnum.includes(choice) || choice === null) {
      this.#choice = choice;
    } else {
      throw "invalid choice";
    }
  }

  getCard() {
    return this.#card;
  }

  setCard(card) {
    this.#card = card;
  }

  getIsUse() {
    return this.#isUse;
  }

  setIsUse(isUse) {
    this.#isUse = isUse;
  }

  getAvailableChoice() {
    return this.#availableChoices;
  }

  setAvailableChoices(choices) {
    this.#availableChoices = choices;
  }

  getShowStates() {
    return {
      id: this.#id,
      number: this.#number,
      score: this.#score,
      quota: this.#quota,
      choice: this.#choice,
      card: this.#card?.getStates(),
      isUse: this.#isUse,
      availableChoices: this.#availableChoices,
    };
  }

  getDatabaseStates() {
    return {
      id: this.#id,
      number: this.#number,
      score: this.#score,
      quota: this.#quota,
      choice: this.#choice,
      card: this.#card?.getName(),
      isUse: this.#isUse,
      availableChoices: this.#availableChoices,
    };
  }
}
