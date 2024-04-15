import { choicesEnum } from "./enum.js";

export class Player {
  #id;
  #number;
  #quota;
  #score;
  #choice;
  #card;
  #availableChoices;

  constructor(data = {}) {
    this.#id = data.id || id;
    this.#number = data.number || number;
    this.#score = data.score || 0;
    this.#quota = data.quota || 2;
    this.#choice = data.choice || null;
    this.#card = data.card || null;
    this.#availableChoices = data.availableChoices || choicesEnum;
  }

  resetRoundState() {
    this.#choice = null;
    this.#card = null;
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

  getAvailableChoice() {
    return this.#availableChoices;
  }

  setAvailableChoices(choices) {
    this.#availableChoices = choices;
  }

  getPlayerStates() {
    return {
      id: this.#id,
      number: this.#number,
      score: this.#score,
      quota: this.#quota,
      choice: this.#choice,
      card: this.#card?.getCardState(),
      availableChoices: this.#availableChoices,
    };
  }
}
