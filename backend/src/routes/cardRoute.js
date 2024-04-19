import { drawCard, submitCard } from '../controllers/cardControllers.js';
import express from "express";

const cardRouter = express.Router();

cardRouter.get('/draw', drawCard);
cardRouter.get('/submit', submitCard);

export default cardRouter;