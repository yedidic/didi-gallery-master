var gPacman;
var PACMAN = 	'&#9786;';

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  // console.log('eventKeyboard:', eventKeyboard);

  if (gState.isGameDone) return;

  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (eventKeyboard.code) {
    case 'ArrowUp':
      //console.log('Arrow Up!');

      nextLocation.i--;
      break;
    case 'ArrowDown':
      //console.log('Arrow Down!');
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      //console.log('Arrow Left!');
      nextLocation.j--;
      break;
    case 'ArrowRight':
      //console.log('Arrow Right!');
      nextLocation.j++;
      break;
  }

  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  // console.log('Heading: row:', newLocation.i , ' col: ', newLocation.j );
  // console.log('Whats there:', gBoard[newLocation.i][newLocation.j]);

  // hitting a wall, not moving anywhere
  if (nextCell === WALL) return;

  // hitting FOOD
  if (nextCell === FOOD) {
    updateScore(1);
  }

  if (nextCell === SUPERFOOD) {
    updateScore(1);
    gPacman.isSuper = true;
    setTimeout(function() {
      gPacman.isSuper = false;
    }, 5000);
  }

  // TODO: add support for power-food

  var isGameOver = checkEngage(nextCell, GHOST);
  if (isGameOver) return;
  else if(nextCell === GHOST) {
    for (var i = 0; i < gGhosts.length; i++) {
      var ghost = gGhosts[i];
      if (ghost.location.i === nextLocation.i && ghost.location.j === nextLocation.j) {
        // not-polite
        gGhosts.splice(i, 1);
        console.log(gGhosts);
        updateScore(1);
        break;
      }
    }
  }

  if (gState.score >= 60) {
    var elH1 = document.querySelector('.modal h1');
    elH1.innerText = 'You Won!';
    openGameOverModal();
  }
  // update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  // render updated model to the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

  // render updated model to the DOM
  renderCell(gPacman.location, PACMAN);
}
