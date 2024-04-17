import { getGameObject, saveGame } from "../logic/utilities.js";

export const submitChoice = async (req, res) => {
  const playerChoice = req.query.choice;
  const player_id = req.query.player_id;
  try {
    const gameObject = await getGameObject();
    //console.log(gameObject.getShowStates());
    gameObject.setPlayerChoice(player_id, playerChoice);
    await saveGame(gameObject);
    res.json(gameObject.getShowStates());
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "cannot submit choice" });
  }
};
