"use strict";
let scores = [0, 0]; // Initialize scores array
let activePlayer = 0; // Initialize activePlayer to 0
let currentScore, playing;

// Switch players
function changePlayers() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    let playerName = document.getElementById('player' + (activePlayer + 1)).value;
    if (playerName === '') {
        playerName = 'Player ' + (activePlayer + 1); // Default to "Player 1" or "Player 2"
    }
    document.getElementById('current').innerText = playerName + "";
}

function rollDie() {
    if (playing) {
        const dice = Math.floor(Math.random() * 6) + 1;
        document.getElementById('die').value = dice;
        document.getElementById('diceImage').src = 'red-dice' + dice + '.png'; // Update the dice image
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById('total').value = currentScore;
        } else {
            changePlayers();
        }
    }
}

// Hold the current score
function holdDie() {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById('score' + (activePlayer + 1)).value = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            playing = false;
            let playerName = document.getElementById('player' + (activePlayer + 1)).value;
            if (playerName === '') {
                playerName = 'Player ' + (activePlayer + 1); // Default to "Player 1" or "Player 2"
            }
            document.getElementById('player' + (activePlayer + 1)).value = playerName + ' Wins!';
        } else {
            changePlayers();
        }
    }
}

// Start a new game
function createNewGame() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    document.getElementById('turn').classList.add('open');
    document.getElementById('total').value = '0';
    document.getElementById('score1').value = '0';
    document.getElementById('score2').value = '0';
    document.getElementById('player1').value = 'Player 1'; // Reset Player 1's name
    document.getElementById('player2').value = 'Player 2'; // Reset Player 2's name
    document.getElementById('player1').removeAttribute('disabled');
    document.getElementById('player2').removeAttribute('disabled');
    changePlayers();
}

window.onload = function () {
    document.getElementById('diceImage').src = '';
    document.getElementById('new_game').onclick = createNewGame;
    document.getElementById('roll').onclick = rollDie;
    document.getElementById('hold').onclick = holdDie;
};