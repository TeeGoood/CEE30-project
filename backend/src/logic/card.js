import { cardsEnum } from "./enum";

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
        console.log('use pre skill');
    }
    
    postSkill(){
        console.log('use post skill');
    }

    getCardState(){
        return {
            name: this.#name,
            description: this.#description,
            isForce: this.#isForce,
        }
    }
}