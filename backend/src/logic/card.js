export class Card{
    #game;
    #isUse;

    constructor(game){
        this.#game = game;
    }

    getIsUse(){
        return this.#isUse;
    }

    setIsUse(isUse){
        this.#isUse = isUse
    }

    preSkill(){
        console.log('use pre skill');
    }
    
    postSkill(){
        console.log('use post skill');
    }
}