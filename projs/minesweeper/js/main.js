'use strict'; /// yyaaaaa
var gCells;
var gLevels = [
    { SIZE: 4, MINES: 2 },
    { SIZE: 6, MINES: 5 },
    { SIZE: 8, MINES: 15 }
];
var gState;
var gLevel;
var gGameInterval;
// CR: Would have been better if scores could survive a reload
var gHighscore = { '0': 999, '1': 999, '2': 999 };
localStorage.setItem('gHighscore', JSON.stringify(gHighscore));
renderHighScore(gHighscore);

function initGame() {
    clearInterval(gGameInterval); // clear the interval if game was restarted.
    var chosenLevelIdx = document.querySelector('input[name="level"]:checked').value;
    gLevel = gLevels[chosenLevelIdx];
    var elH1 = document.querySelector('h1');
    elH1.innerText = 'Welcome to Minesweeper!';
    gCells = createCells(gLevel.SIZE);
    renderBoard(gCells);
    gState = {
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    };
    renderTimeline();
    renderMinesLeft();
    var elEmoji = document.querySelector('.emoji');
    elEmoji.innerText = '😇';
}
function numTo3charsStr(num) {
    var str;
    if (num < 0) return '000';
    if (num < 10) {
        str = '00';
        str += num;
        return str;
    }
    else if (num < 100) {
        str = '0';
        str += num;
        return str;
    }
    else if (num >= 999) return '999';
    return num + '';

}
// CR: nice
function renderTimeline() {
    var timeStr = numTo3charsStr(gState.secsPassed++);
    for (var i = 0; i < 3; i++) {
        //timeclock
        var char = timeStr.charAt(i);
        var className = '.time' + i;
        var currImg = document.querySelector(className);
        currImg.src = 'img/' + char + '.png';
    }

}
function renderMinesLeft() {
    var minesLeftStr = numTo3charsStr(gLevel.MINES - gState.markedCount);
    for (var i = 0; i < 3; i++) {
        //Mines left display
        var char = minesLeftStr.charAt(i);
        var className = '.mines-left' + i;
        var currImg = document.querySelector(className);
        currImg.src = 'img/' + char + '.png';
    }
}
function setMinesNegsCountOnVal() {
    //this function updates the 'val' property according to number of mines counted around
    for (var i = 0; i < gCells.length; i++) {
        for (var j = 0; j < gCells[0].length; j++) {
            var cell = gCells[i][j];
            if (!cell.isMine) cell.val = countMineNegs(cell);
            else cell.val = -1;
        }
    }
}
function countMineNegs(cell) {
    var count = 0;
    for (var i = cell.i - 1; i <= cell.i + 1; i++) {
        if (i < 0 || i > gCells.length - 1) continue;
        for (var j = cell.j - 1; j <= cell.j + 1; j++) {
            if (j === cell.j && i === cell.i) continue;
            if (j < 0 || j > gCells[0].length - 1) continue;
            if (gCells[i][j].isMine) count++;
        }
    }
    return count;
}
function locateMines(firstCell) {
    var count = 0;
    while (count < gLevel.MINES) {
        var rndI = getRandomInt(0, gLevel.SIZE);
        var rndJ = getRandomInt(0, gLevel.SIZE);
        if ((rndI === firstCell.i + 1 || rndI === firstCell.i - 1 || rndI === firstCell.i)
            && (rndJ === firstCell.j + 1 || rndJ === firstCell.j - 1 || rndJ === firstCell.j)) {
            continue;
        }
        if (gCells[rndI][rndJ].isMine) continue;
        gCells[rndI][rndJ].isMine = true;
        count++;
    }
}
function createCells(levelSize) {
    var cells = [];
    for (var i = 0; i < levelSize; i++) {
        cells[i] = [];
        for (var j = 0; j < levelSize; j++) {
            var cell = {
                isMine: false,
                val: 0,
                i: i,
                j: j,
                isMarked: false,
                isShown: false,
            };
            cells[i][j] = cell;
        }
    }
    return cells;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var className = 'square blank';
            var tdId = 'cell-' + i + '-' + j;
            strHtml += '<td id="' + tdId +
                '" onmousedown="whichButton(event, this)" ' +
                'class="' + className + '">' + '</td>';
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.gameBoard');
    elMat.innerHTML = strHtml;
}
function cellClicked(elCell) {

    var coord = getCellObjByCoord(elCell.id);
    var cell = gCells[coord.i][coord.j]
    if (!cell.isMarked && !cell.isShown) {

        //game over activation
        if (cell.isMine) {
            looseSituation();
            return;
        }
        elCell.classList.add('open' + cell.val);
        elCell.classList.remove('blank');
        if (cell.val > 0) elCell.innerText = '' + cell.val;
        cell.isShown = true;
        gState.shownCount++;

        if (isVictory()) {
            winSituation()
            return;
        }

        //locating mine at first click, and starting the timer:
        if (gState.shownCount === 1) {
            locateMines(cell);
            setMinesNegsCountOnVal();
            gGameInterval = setInterval(renderTimeline, 1000);
        }
        //generating recursive func. to spread empty&open cells.
        if (cell.val === 0) funAroundZero(cell);

    }

}
// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellObjByCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    // console.log('coord', coord);
    return coord;
}
// Gets a {i:2, j:7} and returns string such as: 'cell-2-7'
function getCoordObjbyCell(coord) {
    var strCellId = '';
    strCellId += 'cell-'
    strCellId += coord.i + '-' + coord.j;
    // console.log('coord', coord);
    return strCellId;
}
function cellMarked(elCell) {
    var coord = getCellObjByCoord(elCell.id);
    var cell = gCells[coord.i][coord.j];
    if (!cell.isShown && !cell.isMarked) {
        cell.isMarked = true;
        gState.markedCount++;
        elCell.innerText = '⚑';
        // elCell.classList.add('marked');
        elCell.classList.remove('blank');
    }
    else if (cell.isMarked) {
        cell.isMarked = false;
        gState.markedCount--;
        elCell.innerText = '';
        elCell.classList.add('blank');
        // elCell.classList.remove('marked');
    }
    renderMinesLeft();
}
function whichButton(ev, elCell) {
    // CR: No need to set window.oncontextmenu on every click
    window.oncontextmenu = function () { return false; }
    switch (ev.button) {
        case 0:
            cellClicked(elCell);//left-mouse-click occured
            break;
        case 2:
            cellMarked(elCell);//right-mouse-click occured
            break;
    }
}
function funAroundZero(cell) {
    // this function opens all the nice neighbors around zero-cell, which are definately not a bomb :)
    for (var i = cell.i - 1; i <= cell.i + 1; i++) {
        if (i < 0 || i > gCells.length - 1) continue;
        for (var j = cell.j - 1; j <= cell.j + 1; j++) {
            if (j === cell.j && i === cell.i) continue;
            if (j < 0 || j > gCells[0].length - 1) continue;
            var negCell = gCells[i][j]; // take the negCell object
            if (negCell.isShown) continue; // check if it's not already shown.
            var elNegCell = document.querySelector('#' + getCoordObjbyCell(negCell));
            cellClicked(elNegCell);
        }
    }
}
function isVictory() {
    return gState.shownCount === gLevel.SIZE ** 2 - gLevel.MINES;
}
function gameBombed(sign) {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = gCells[i][j]; // take the negCell object
            if (cell.isShown) continue; // check if it's not already shown.
            cell.isShown = true;
            var elCell = document.querySelector('#' + getCoordObjbyCell(cell));
            elCell.classList.add('open' + cell.val);
            elCell.classList.remove('blank');
            if (cell.val > 0) {
                // elCell.classList.remove('marked');
                elCell.innerText = '' + cell.val;
            }
            if (cell.val === -1) {
                elCell.innerText = sign;
                if (sign === '⚑') { //case winning
                    elCell.classList.remove('open-1');
                }
            }
        }
    }
}
function looseSituation() {
    gameBombed('💣');
    clearInterval(gGameInterval);
    var elH1 = document.querySelector('h1');
    elH1.innerText = 'Game Over!';
    var elEmoji = document.querySelector('.emoji');
    elEmoji.innerText = '🤯';
}
function winSituation() {
    gameBombed('⚑');
    clearInterval(gGameInterval);
    var elH1 = document.querySelector('h1');
    elH1.innerText = 'Congratulations!!';
    gState.markedCount = gLevel.MINES;
    renderMinesLeft();
    var elEmoji = document.querySelector('.emoji');
    elEmoji.innerText = '😎';
    var chosenLevelIdx = document.querySelector('input[name="level"]:checked').value;
    updateHighscore(chosenLevelIdx, gState.secsPassed-1);
}
function updateHighscore(levelIdx, newScore) {
    // Retrieve the object from storage
    var retrievedScoreStr = localStorage.getItem('gHighscore');
    var lastScoreObj = JSON.parse(retrievedScoreStr);
    if (newScore < lastScoreObj[levelIdx]) {
        lastScoreObj[levelIdx] = newScore;
        localStorage.setItem('gHighscore', JSON.stringify(lastScoreObj));
        renderHighScore(lastScoreObj);
    }
}
function renderHighScore(highscore) {
    var elEasy = document.querySelector('.easy');
    var elMed = document.querySelector('.med');
    var elExp = document.querySelector('.exp');
    if(highscore[0]!== 999)elEasy.innerText = 'Easy: ' + highscore[0];
    else elEasy.innerText = 'Easy: Never broken yet!';
    if(highscore[1]!== 999)elMed.innerText = 'Medium: ' + highscore[1];
    else elMed.innerText = 'Medium: Never broken yet!';
    if(highscore[2]!== 999)elExp.innerText = 'Expert: ' + highscore[2];
    else elExp.innerText = 'Expert: Never broken yet!';
}
