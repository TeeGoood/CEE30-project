import GameModel from "../models/gameModel.js";
import PlayerModel from "../models/playerModel.js";
import { Game } from "./game.js";

export function checkWinner(game){
    const player1 = game.getPlayerByNumber(1);
    const player2 = game.getPlayerByNumber(2);
    const choice1 = player1.getChoice();
    const choice2 = player2.getChoice();
    if (
        (choice1 === "rock" && choice2 === "scissors") ||
        (choice1 === "paper" && choice2 === "rock") ||
        (choice1 === "scissors" && choice2 === "paper")
    ) {
        game.setResult("player1");
        player1.setScore(player1.getScore() + 1);
    } else if (choice1 == choice2) {
        game.setResult("draw");
    } else {
        game.setResult("player2");
        player2.setScore(player2.getScore() + 1);
    }
}

const convertDatabaseToObject = async (gameData) => {
    const gameObject = new Game(gameData);
    if(gameData.player1){
        const player1 = await PlayerModel.findById(gameData.player1);
        gameObject.createPlayer(player1);
    }
    if(gameData.player2){
        const player2 = await PlayerModel.findById(gameData.player2);
        gameObject.createPlayer(player2);
    }
    return gameObject;
}

export const saveGame = async (gameObject) => {
    await GameModel.findOneAndUpdate({}, gameObject.getDatabaseStates());
    const player1 = gameObject.getPlayerByNumber(1);

    if(player1){
        await PlayerModel.findByIdAndUpdate(player1.getId(), player1.getDatabaseStates());
    }

    const player2 = gameObject.getPlayerByNumber(2);
    if(player2){
        await PlayerModel.findByIdAndUpdate(player2.getId(), player2.getDatabaseStates());       
    }
}

export const getGameObject = async () =>{
    let gameData = await GameModel.findOne({});
    if(!gameData){
        gameData = {}; 
    }

    const gameObject = await convertDatabaseToObject(gameData);
    return gameObject;
}

