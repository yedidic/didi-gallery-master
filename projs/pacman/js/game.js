'use strict';
var WALL = '#';
var FOOD = '.';
var EMPTY = ' ';
var SUPERFOOD = '&#129367;';

var gBoard;
var gState = {
  score: 0,
  isGameDone: false
};
var gCherryInterval = setInterval(randomizeCherry, 15000);

function init() {
  gBoard = buildBoard();
  printMat(gBoard, '.boardContainer');
  console.table(gBoard);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      if ((i === 1 || i === SIZE - 2) && (j === 1 || j === SIZE - 2)) {
        board[i][j] = SUPERFOOD;
        continue;
      }
      board[i][j] = FOOD;

      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j == 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL;
      }
    }
  }
  createPacman(board);
  createGhosts(board);
  return board;
}

// This function is called from both pacman and ghost to check engage
function checkEngage(cell, opponent) {
  if (cell === opponent) {
    // TODO: basic support for eating power-ball (which is not in the game yet)
    if (gPacman.isSuper) {
      console.log('Ghost is dead');
    } else {
      clearInterval(gIntervalGhosts);
      clearInterval(gCherryInterval);
      gState.isGameDone = true;
      // TODO: GameOver popup with a play again button
      // alert('Game Over!');
      console.log('Game Over!');
      var elH1 = document.querySelector('.modal h1');
      elH1.innerText = 'You Lose!';
      openGameOverModal();
      return true;
    }
  }
  return false;
}

// this function updates both the model and the dom for the score
function updateScore(value) {
  gState.score += value;
  document.querySelector('header > h3 > span').innerText = gState.score;
}

function openGameOverModal() {
  document.querySelector('.modal').classList.add('modal-open');
}

function closeGameOverModal() {
  document.querySelector('.modal').classList.remove('modal-open');
}
function newGameChose() {
  closeGameOverModal();
  init();
  gState = {
    score: 0,
    isGameDone: false
  };
  updateScore(0);
}

function randomizeCherry() {
  var rndI = getRandomIntInclusive(1, gBoard.length - 2);
  var rndJ = getRandomIntInclusive(1, gBoard.length - 2);
  if (gBoard[rndI][rndJ] === FOOD) {
    renderCell({ i: rndI, j: rndJ }, '🍒');
  }
}
