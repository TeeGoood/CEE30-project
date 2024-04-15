import { cardsEnum, choicesEnum } from "./enum.js";

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