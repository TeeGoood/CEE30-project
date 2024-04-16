import { getGameObject, saveGame } from "../logic/utilities";

export const submitChoice = async (req, res) => {
  const playerChoice = req.query.choice;
  const player_id = req.query.player_id;
  try {
    const gameObject = await getGameObject();
    gameObject.setPlayerChoice(player_id, playerChoice);
    await saveGame(gameObject);
    res.json(gameObject.getShowStates());
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "cannot submit choice" });
  }
};
