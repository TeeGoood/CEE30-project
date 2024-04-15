import { cardsEnum, choicesEnum } from "./enum.js";

export class Card{
    #name;
    #description;
    #isUse;
    #isForce;
    #game;
    #player;

    constructor(data = {}){
        //required valid name and game object
        if(!data.name){
            throw("not given card\'s name");
        }

        if(!data.game){
            throw('not given card\'s game');
        }
        
        if(!(data.name in cardsEnum)){
            throw('invalid card name');
        }
        
        this.#name = data.name;
        this.#description = cardsEnum[data.name].description;
        this.#isUse = data.isUse || false;
        this.#isForce = cardsEnum[data.name].isForce;
        this.#game = data.game;
        this.#player = data.player || null;

    }

    preSkill(){
        cardsEnum[this.#name].preSkill(this.#game, this.#player);
    }
    
    postSkill(){
        cardsEnum[this.#name].postSkill(this.#game, this.#player);
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

    getCardState(){
        return {
            name: this.#name,
            description: this.#description,
            isForce: this.#isForce,
            isUse: this.#isUse
        }
    }
}