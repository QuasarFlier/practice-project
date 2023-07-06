'use strict';

const btnReset = document.querySelector('.btn-reset');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');
const score0 = document.getElementById('score-0');
const score1 = document.getElementById('score-1');
const current0 = document.getElementById('current-0');
const current1 = document.getElementById('current-1');
const cube = document.querySelector('.dice');
let count = 0;
let currentScore = 0;
let activePlayer = 0;
let playing = true;
const changeVar = true;

const starting = function () {
  count = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  player0.classList.add('player-active');
  player1.classList.remove('player-active');
  playing = true;
  cube.classList.add('hidden');
  player0.classList.remove('player-winner');
  player1.classList.remove('player-winner');
};
starting();

const swap = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0.classList.toggle('player-active');
  player1.classList.toggle('player-active');
};

btnRoll.addEventListener('click', function () {
  if (playing == true) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    cube.classList.remove('hidden');
    cube.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      swap();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing == true) {
    count[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      count[activePlayer];
    if (count[activePlayer] >= 40) {
      playing = false;
      cube.classList.add('hidden');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player-winner');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player-active');
    } else {
      swap();
    }
  }
});

btnReset.addEventListener('click', starting);
