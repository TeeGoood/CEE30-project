import { getGameData, joinGame, resetGame, resumeGame } from '../controllers/gameControllers.js';
import express from "express";

const gameRouter = express.Router();

gameRouter.get('/', getGameData);
gameRouter.get('/join', joinGame);
gameRouter.get('/reset', resetGame);
gameRouter.get('/resume', resumeGame);

export default gameRouter;
