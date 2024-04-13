export class Card{
    #game;
    #isUse;
    #isForce = false;

    constructor(game){
        this.#game = game;
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
}