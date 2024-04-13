import { cardsEnum, choicesEnum } from "./enum";

export class Card{
    #name;
    #description;
    #game;
    #isUse;
    #isForce = false;

    constructor(game, name){
        this.#game = game;
        if(cardsEnum.includes(name)){
            this.#description = cardsEnum[name];
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

    preSkill(){
        choicesEnum[this.#name].preSkill(game, player);
    }
    
    postSkill(){
        choicesEnum[this.#name].postSkill(game, player);
    }

    getCardState(){
        return {
            name: this.#name,
            description: this.#description,
            isForce: this.#isForce,
        }
    }
}