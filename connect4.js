/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
let gameOver = false;

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let row = 0; row < HEIGHT; row++){
    board[row] = [];
    for (let column = 0; column < WIDTH; column++){
      board[row][column] = null;
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");
  // TODO: creates top row by creating a row name column-top and checking for a click event. Appents td to row and appends to board.
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: creates the game board by create trs and tds based on height and width. appends td to row. appends to board.
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: Using the x, check through y column in reverse to see if the cell is empty; if so, add circle and set cell to true to show it is full;
  for (i = HEIGHT - 1; i >= 0; i--){
    if (board[i][x] === null){
      board[i][x] = currPlayer;
      return i;
    }
  }
  if (board[0][x] != null){
    return null;
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const chosenCell = document.getElementById(`${y}-${x}`);
  const div = document.createElement("div");
  div.setAttribute('class', `piece p${currPlayer}`);
  chosenCell.append(div);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // if game is over, output message that game is over
  if (gameOver === true){
    return endGame("Sorry, but this game is over! Refresh to try again!")
  }
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    gameOver = true;
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (checkForTie()){
    gameOver = true;
    return endGame("No spots left. It's a draw!");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if (currPlayer === 1){
    currPlayer = 2;
  }
  else {currPlayer = 1};

  // list which player's turn it is
  let playerText = document.getElementById("player")
  playerText.innerText = `Player ${currPlayer}'s Turn`;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
 //move through each x and y coordinate to check the status
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      //check for 4 entries along the x axis
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      //check for 4 entries along the y axis
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      //check for 4 entires along a diagnol either eway
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // if any of the above checks return true, return true to show that a player has won
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

//checks to see if all cells return a value; if so, the board is full and the game is a tie
function checkForTie(){
  return board.every(function(box){
    return box.every(function(cell){
      return cell === 1 || cell ===2;
    })
  })
}

makeBoard();
makeHtmlBoard();
