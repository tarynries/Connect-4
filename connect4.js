/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6; // size of game board 


let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
    for (let i = 0; i < HEIGHT; i++) {
        board[i] = Array(WIDTH).fill(null);
    }
    // TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
    const htmlBoard = document.getElementById("board"); // creating the variable for the html board
    // board.innerHTML = '';
    // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

    // TODO: add comment for this code
    let top = document.createElement("tr");  // tr is setting up the table rows 
    top.setAttribute("id", "column-top"); // creates the top of the board which will be able to be clicked on
    top.addEventListener("click", handleClick); // setting up the click 

    for (let x = 0; x < WIDTH; x++) { // looping over the whole board to create cells which go across the whole width
        var headCell = document.createElement("td"); // td is setting up the data cells 
        headCell.setAttribute("id", x);
        top.append(headCell); // placing the td cells below the headcells by appending them 
    }
    htmlBoard.append(top);

    // TODO: add comment for this code
    for (let y = 0; y < HEIGHT; y++) {
        const row = document.createElement("tr"); // looping to create multiple rows
        for (let x = 0; x < WIDTH; x++) {
            const cell = document.createElement("td"); // looping to create multiple cells 
            cell.setAttribute("id", `${y}-${x}`);
            row.append(cell); // placing each row below the previous 
        }
        htmlBoard.append(row);
    }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
    for (let y = 0; y < WIDTH; y++) {
        if (board[y][x] === null) return y;
        // TODO: write the real version of this, rather than always returning 0
    }
    return null;
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
    const div = document.createElement('div'); // creating div variable
    div.classList.add('piece', 'player' + currPlayer); // adding pieces to the table based on current player 
    document.querySelector("#board").rows[HEIGHT - y].cells[x].append(div); // selecting which row and cell to place piece in 
}



// TODO: make a div and insert into correct table cell


/** endGame: announce game end */

function endGame(msg) {
    alert(msg) //leaving the alert with msg allows different messages to pop up based on the results

    // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;   // allowing the pieces to be places in the column that is clicked on 

    // get next spot in column (if none, ignore click)
    const y = findSpotForCol(x);
    if (y === null) {
        return; // if the column is full a piece can not be placed
    }



    board[y][x] = currPlayer; // updates memory board
    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    placeInTable(y, x);  // calling the place in table function for a piece to be placed with some x, y coordinates 



    // check for win
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`); // if a player wins the msg alert will be activated with which player won 
    }
    const cell = document.createElement("td");
    if (board.every(row => row.every(cell => cell))) { // checking if all the cells in the board are full 
        return endGame('Tie!');
    }  // if all the cells are full and no one has won it will alert a tie msg 



    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame

    // switch players
    // TODO: switch currPlayer 1 <-> 2

    switchPlayer(); // calling the switch player function 

}


/*function isTie(board) {
    for (let y = 0; y < WIDTH; y++) {
        for (let x = 0; x < HEIGHT; x++) {
            if (board[y][x] === '') {
                return true;
            };
        }
    }
}*/




function switchPlayer() {  // this function allows switching between player 1 and player 2 after each turn
    console.log(currPlayer, currPlayer === 1);
    if (currPlayer === 1) {
        currPlayer = 2; // if player one is going then it returns player 2 so they can go next 
    } else {
        currPlayer = 1; // other wise if player 2 is going it returns to player 1 
    }
}


//}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        return cells.every(
            ([y, x]) =>
                y >= 0 &&
                y < HEIGHT && // less than or equal to 0, and less than height aka it fits in the height of board
                x >= 0 &&
                x < WIDTH && // fits in the width on the board
                board[y][x] === currPlayer
        );
    }

    // TODO: read and understand this code. Add comments to help you.

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // one is being added to the x axis each time to create a horizontal win
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // one is being added to the y axis each time to create a vertical win
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // adding to the x and y axis each time to create a diagonal win
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // addint to the y axis and subtracting from the x axis to create a diagonal win the opposite direction

            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { // if someone has won with any of the 4 options return true for "win"
                return true;
            }
        }
    }
}

makeBoard();
makeHtmlBoard();