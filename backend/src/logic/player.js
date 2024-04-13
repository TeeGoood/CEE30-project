import { choicesEnum } from "./enum.js";

export class Player {
  #id;
  #choice;
  #score;
  #number;
  #card = null;
  #quota;
  #availableChoices = choicesEnum;

  constructor(id, number) {
    this.#id = id;
    this.#number = number;
    this.#choice = null;
    this.#score = 0;
    this.#quota = 2;
  }

  resetRoundState(){
    this.#choice = null;
    this.#card = null;
    this.#availableChoices = choicesEnum;
  }

  getQuota(){
    return this.#quota;
  }

  setQuota(quota){
    this.#quota = quota; 
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

  setAvailableChoices(choices){
    this.#availableChoices = choices;
  }

  getNumber(){
    return this.#number;
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

  getNumber(){
    return this.#number;
  }

  getCard(){
    return this.#card;
  }

  setCard(card){
    this.#card = card; 
  }

  getPlayerStates() {
    return {
      id: this.#id,
      choice: this.#choice,
      score: this.#score,
      number: this.#number,
      card: this.#card.getCardState(),
      quota: this.#quota,
      availableChoices: this.#availableChoices,
    };
  }
}
