function printMat(mat, selector) {
  var elContainer = document.querySelector(selector);

  var strHTML = '<table border="0"><tbody>';
  mat.forEach(function(row, i) {
    strHTML += '<tr>';

    row.forEach(function(cell, j) {
      var className = 'cell cell' + i + '-' + j;

      strHTML += '<td class="' + className + '"> ' + cell + ' </td>';
    });
    strHTML += '</tr>';
  });
  strHTML += '</tbody></table>';

  // console.log('strHTML', strHTML);

  elContainer.innerHTML = strHTML;
}

function renderCell(location, value) {
  var cellSelector = '.cell' + location.i + '-' + location.j;
  var elCell = document.querySelector(cellSelector);
  elCell.innerHTML = value;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getFromStorage(key) {
  var str = localStorage.getItem(key);
  return JSON.parse(str);
}
// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellObjByCoord(strCellId) {
  var coord = {};
  coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
  coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
  // console.log('coord', coord);
  return coord;
}