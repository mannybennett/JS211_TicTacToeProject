'use strict';

// brings in the assert module for unit testing
const assert = require('assert');
// brings in the readline module to access the command line
const readline = require('readline');
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// creates an empty "board" for the user to see where marks can be placed.
// using let because the variable is expected to change with more 'X's and 'O's to add
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

// assigns the first mark as 'X'
// using let because the variable is expected to change from 'X' to 'O' and back
let playerTurn = 'X';

// is a function that print the current status of the board using the variable - board
const printBoard = () => {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

const horizontalWin = () => {

  const horizontalWin1 = board[0][0] === playerTurn && board[0][1] === playerTurn && board[0][2] === playerTurn
  const horizontalWin2 = board[1][0] === playerTurn && board[1][1] === playerTurn && board[1][2] === playerTurn
  const horizontalWin3 = board[2][0] === playerTurn && board[2][1] === playerTurn && board[2][2] === playerTurn

  if (horizontalWin1 || horizontalWin2 || horizontalWin3) {
    return true
  } else {
    return false
  }
}

const verticalWin = () => {

  const verticalWin1 = board[0][0] === playerTurn && board[1][0] === playerTurn && board[2][0] === playerTurn
  const verticalWin2 = board[0][1] === playerTurn && board[1][1] === playerTurn && board[2][1] === playerTurn
  const verticalWin3 = board[0][2] === playerTurn && board[1][2] === playerTurn && board[2][2] === playerTurn

  if (verticalWin1 || verticalWin2 || verticalWin3) {
    return true
  } else {
    return false
  }
}

const diagonalWin = () => {

  const diagonalWin1 = board[0][0] === playerTurn && board[1][1] === playerTurn && board[2][2] === playerTurn
  const diagonalWin2 = board[0][2] === playerTurn && board[1][1] === playerTurn && board[2][0] === playerTurn

  if (diagonalWin1 || diagonalWin2) {
    return true
  } else {
    return false
  }
}

const checkForWin = () => {
  if (horizontalWin() || verticalWin() || diagonalWin()) {
    return true 
  } else {
    return false
  }
}

const ticTacToe = (row, column) => {
  board[row][column] = playerTurn
  if (!checkForWin()) {
    playerTurn = playerTurn === "X" ? "O" : "X"
  }
}

const getPrompt = () => {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });
}


// Unit Tests
// You use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      ticTacToe(0, 0)
      ticTacToe(0, 1)
      ticTacToe(1, 1)
      ticTacToe(0, 2)
      ticTacToe(2, 2)
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
