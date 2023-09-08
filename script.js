'use strict';
//DOM manipulation
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceSound = document.querySelector('.sound--dice');
const switchSound = document.querySelector('.sound--switch');
const winnerSound = document.querySelector('.sound--winnig');

const diceEl = document.querySelector('.dice');

// creat a function for the game
let scores, currentScore, activePlayer, playing;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  switchSound.play();
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function roll() {
  if (playing) {
    //Make sound effect of dice roll.
    diceSound.pause();
    diceSound.play();
    //Generating a random dice roll?
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    //Display the result of the dice roll on screen.
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;
    // Check if dice roll is 1 or not
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
}

function hold() {
  if (playing && currentScore > 0) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      // the current player won
      winnerSound.play();
      playing = false;
      diceEl.classList.remove('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
}

//Event manipulation
btnRoll.addEventListener('click', roll);
btnHold.addEventListener('touchstart', roll);

btnHold.addEventListener('click', hold);
btnHold.addEventListener('touchstart', hold);

btnNew.addEventListener('click', init);
btnNew.addEventListener('touchstart', init);
