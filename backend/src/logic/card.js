import { cardsEnum, choicesEnum } from "./enum.js";

<<<<<<< HEAD
export class Card{
    #name;
    #description;
    #game;
    #isUse;
    #isForce = false;
    #player;

    constructor(game, name){
        this.#game = game;
        if(name in cardsEnum){
            //console.log(name);
            this.#name = name;
            this.#description = cardsEnum[name].description;
        }
    }

    getIsUse(){
        return this.#isUse;
    }

    setIsUse(isUse){
        this.#isUse = isUse
    }

    getIsForce(){
        return this.#isForce;
    }

    setPlayer(player){
        this.#player = player;
    }

    preSkill(){
        //console.log(cardsEnum[this.#name]);
        cardsEnum[this.#name].preSkill(this.#game, this.#player);
    }
    
    postSkill(){
        cardsEnum[this.#name].postSkill(this.#game, this.#player);
    }

    getCardState(){
        return {
            name: this.#name,
            description: this.#description,
            isForce: this.#isForce,
            isUse: this.#isUse
        }
    }
}
=======
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
>>>>>>> main
