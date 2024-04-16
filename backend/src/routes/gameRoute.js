import { getGameData, joinGame, resetGame } from '../controllers/gameControllers.js';
import express from "express";

const gameRouter = express.Router();

gameRouter.get('/', getGameData);
gameRouter.get('/join', joinGame);
gameRouter.get('/reset', resetGame);

export default gameRouter;
