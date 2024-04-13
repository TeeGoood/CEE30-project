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