let drawCount = 2; // Initial draw count
let playerScore = 0;
let opponentScore = 0;

function startGame() {
    document.querySelector('.score-container').style.display = 'block';
    document.querySelector('.card-image').style.display = 'block';
    document.querySelector('.draw-card-btn').style.display = 'block';
    document.querySelector('.container').style.display = 'block';
    document.querySelector('.waiting-text').style.display = 'none';
    document.querySelector('.start-button').style.display = 'none';
}

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

    // button.disabled = true;
    // //delay the click for 3 secs
    // setTimeout(function() {
    //     button.disabled = false;
    // }, 3000);

    let result = '';
    if (userChoice === computerChoice) {
        showResultMessage('It\'s a tie!');
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        showResultMessage('You win!');
        playerScore++;
    } else {
        showResultMessage('You lose!');
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
    document.getElementById('playerScore').textContent = `${playerScore}`;
    document.getElementById('opponentScore').textContent = `${opponentScore}`;
}

function showResultMessage(message) { 
    //show popup for 3 secs
    var count = 3;
    var countdown = setInterval(function() {
        document.getElementById("resultMessage").textContent = message;
        document.getElementById("result-text").style.display = "block";
        document.getElementById("timer").textContent = "Next turn in " + count + " seconds";
        count--;
        if (count === -1) {
            clearInterval(countdown);
            document.getElementById("result-text").style.display = "none"; //close popup after 3 secs
        }
    }, 1000);
  }
