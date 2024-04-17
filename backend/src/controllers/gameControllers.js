import mongoose from "mongoose";
import { getGameObject, saveGame } from "../logic/utilities.js";
import PlayerModel from "../models/playerModel.js";

export const getGameData = async (req, res) => {
  try {
    const gameObject = await getGameObject();
    res.json(gameObject.getShowStates());
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "cannot get game data",
    });
  }
};

export const joinGame = async (req, res) => {
  try {
    const gameObject = await getGameObject();
    if (gameObject.getPlayerByNumber(1) && gameObject.getPlayerByNumber(2)) {
      res.status(500).json({
        error: "game is full",
      });
      return;
    }

    const playerObject = gameObject.createPlayer({
      id: new mongoose.Types.ObjectId(),
    });

    const playerModel = new PlayerModel(playerObject.getDatabaseStates());
    await playerModel.save();
    await saveGame(gameObject);
    res.json(playerObject.getShowStates());
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "cannot join game" });
  }
};

export const resetGame = async (req, res) => {
  try {
    const gameObject = await getGameObject();
    const player1 = gameObject.getPlayerByNumber(1)
    const player2 = gameObject.getPlayerByNumber(2);

    if(player1){
      await PlayerModel.findByIdAndDelete(player1.getId());
    }

    if(player2){
      await PlayerModel.findByIdAndDelete(player2.getId());
    }

    gameObject.resetGameStates();
    await saveGame(gameObject);
    res.json({ message: "reset game successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "cannot reset game" });
  }
};

export const resumeGame = async (req, res) => {
  try {
    const gameObject = await getGameObject();
    if(gameObject.getGameStates() != "card_select"){
      gameObject.resumeGame();
    }
    await saveGame(gameObject);
    res.json(gameObject.getShowStates());
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "cannot resume game" });
  }
};
