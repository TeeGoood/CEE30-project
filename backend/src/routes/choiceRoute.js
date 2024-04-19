import { submitChoice } from '../controllers/choiceControllers.js';
import express from "express";

const choiceRouter = express.Router();

choiceRouter.get('/submit', submitChoice);

export default choiceRouter;