import { choicesEnum } from "./enum.js";

export class Player {
  #id;
  #choice;
  #score;
  #point;

  constructor(id) {
    this.#id = id;
    this.#choice = null;
    this.#score = 0;
    this.#point = 0;
  }

  getChoice() {
    return this.#choice;
  }

  setChoice(choice) {
    if (choicesEnum.includes(choice) || choice === null) {
      this.#choice = choice;
    } else {
      console.log("error: not in definded choices");
      return;
    }
  }

  getId() {
    return this.#id;
  }

  getScore() {
    return this.#score;
  }

  setScore(score) {
    this.#score = score;
  }

  getPoint() {
    return this.#point;
  }

  setPoint(point) {
    this.#point = point;
  }

  resetChoice() {
    this.setChoice(null);
  }

  resetRoundStates() {
    this.setChoice(null);
    this.#score = 0;
  }

  getPlayerStates() {
    return {
      id: this.#id,
      choice: this.#choice,
      score: this.#score,
      point: this.#point,
    };
  }
}
