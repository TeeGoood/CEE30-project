let drawCount = 2; // Initial draw count
let playerScore = 0;
let opponentScore = 0;

function drawCard() {
    if (drawCount > 0) {
        drawCount--;
        document.querySelector('.draw-count').textContent = `${drawCount}/2`;
        // Add your logic for drawing a card here
    }

    // Update image source and disable button when drawCount reaches 0
    if (drawCount === 0) {
        document.querySelector('.draw-card-btn img').src = "cardburn.png";
        document.querySelector('.draw-card-btn').disabled = true;
    }
}

function play(userChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    let result = '';

    if (userChoice === computerChoice) {
        result = 'It\'s a tie!';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'You win!';
        playerScore++;
    } else {
        result = 'You lose!';
        opponentScore++;
    }

    // Display the image of what the computer chose
    const computerChoiceImage = document.createElement('img');
    computerChoiceImage.src = `${computerChoice}.png`; // Assuming you have images named rock.png, paper.png, and scissors.png
    computerChoiceImage.alt = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
    computerChoiceImage.width = 100;
    computerChoiceImage.height = 100;

    // Clear previous content
    document.getElementById('opponentChoice').innerHTML = '';

    // Append the image to the opponentChoice div
    document.getElementById('opponentChoice').appendChild(computerChoiceImage);

    // Update the result text
    document.getElementById('resultMessage').textContent = result;

    // Update player and opponent scores
    document.getElementById('playerScore').textContent = `Player: ${playerScore}`;
    document.getElementById('opponentScore').textContent = `Opponent: ${opponentScore}`;
}