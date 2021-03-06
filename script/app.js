//angular module to set as ng-app
angular.module("TicTacToe", [])
//controller for the board container
.controller("BoardController", function($scope) {
  //paths for x and o images
  $scope.xImg = "./image/x.png";
  $scope.oImg = "./image/o.png";

  //initialize boolean variable to represent whether or not game is over
  $scope.gameOver = false;

  //initialize turns variable to track how many turns have been played
  $scope.turns = 0; 

  //initializes current variable to track the current player (starts with x)
  $scope.current = "X";

  //the number of rows on the board (defaults to 3)
  $scope.rows = 3; 

  //initialize board matrix
  $scope.board = []; 

  //text to print at the top of the page, will default to game title
  $scope.header = "Tic Tac Toe";

  //variable to recognize the winner when the game ends
  $scope.winner;

  $scope.createMatrix = function () {
    //generate arrays to represent board rows (as many as $scope.rows)
    for (var i = 0; i < $scope.rows; i++) {
      //initialize row array
      var row = [];
      //generate objects within those row arrays to represent cells
      for (var n = 0; n < $scope.rows; n++) {
        //give each cell a clicked status (each will be initialized as false)
        row[n] = {clicked: false};
        //assign properties to dictate which sides each cell will need a border for
        if (n !== 0) {
          row[n].right = true;
        } 
        if (i !== 0) {
          row[n].bottom = true;
        } 
        if (n !== $scope.rows - 1) {
          row[n].left = true;
        } 
        if (i !== $scope.rows - 1) {
          row[n].top = true;
        }
      }
      //push that row of cell objects to the board matrix
      $scope.board.push(row);
    }
  }

  //function to clear the board after game ends, run on restart button click
  $scope.clearBoard = function () {
    //reset board matrix
    $scope.board = [];
    //reset gameOver boolean
    $scope.gameOver = false;
    //reset the current player to x
    $scope.current = "X";
    //reset total turns taken
    $scope.turns = 0;
    //re-create the matrix
    $scope.createMatrix();
    //reset header to game title
    $scope.header = "Tic Tac Toe";
    //reset the winner
    $scope.winner = false;
  }

  $scope.calcLinear = function (row, col) {
    //initialize row and column counter variables to track row streaks
    var colCount = 1;
    var rowCount = 1;
    //check possible horizontal and vertical rows for given coordinates
    for (var i = 0; i < $scope.rows; i++) {
      //check if current cell's play is equal to current play if index 
      //isn't input row coordinate (already counted)
      if (i !== row && $scope.board[i][col].play === $scope.current) {
        //if so, increment colCount
        colCount++;
      }
      //check if current is equal to current play if index isn't input col
      if (i !== col && $scope.board[row][i].play === $scope.current) {
        //if so, increment rowCount
        rowCount++;
      }
    }
    //if there is either a full row or a full column
    if (colCount === $scope.rows || rowCount === $scope.rows) {
      //set gameOver variable to true
      $scope.gameOver = true;
      //set header to congratulate the winning player
      $scope.header = "Congratulations Player " + $scope.current + "!";
      //set winner to be the current player
      $scope.winner = $scope.current;
    }
  }

  $scope.calcDiagonal = function (row, col, inRow) {
    //initialize variable to represent numbers in left to right diagonal row
    var leftToRight = 1;
    //initialize variable to represent right to left diagonal row
    var rightToLeft = 1;
    var board = $scope.board;
    var length = board.length; 
    var play = board[row][col].play;
    //for loop to iterate through all numbers on either side of current coordinate
    for (var i = 1; i < length; i++) {
      //check whether each cell in range is valid and if it is equal to the current play
      if (row - i >= 0 && col - i >= 0 && board[row - i][col - i].play === play) {
        //increment accordingly
        leftToRight++;
      }
      if (row + i < length && col + i < length && board[row + i][col + i].play === play) {
        leftToRight++;
      }
      if (row - i >= 0 && col + i < length && board[row - i][col + i].play === play) {
        rightToLeft++;
      }
      if (row + i < length && col - i >= 0 && board[row + i][col - i].play === play) {
        rightToLeft++;
      }
    }
    if (leftToRight === $scope.rows || rightToLeft === $scope.rows) {
      //set gameOver variable to true
      $scope.gameOver = true;
      //set header to congratulate the winning player
      $scope.header = "Congratulations Player " + $scope.current + "!";
      //set winner to be the current player
      $scope.winner = $scope.current;
    } 
  }

  $scope.setAttributes = function (row, col) {
    //set $scope image property to contain the appropriate image path
    $scope.image = $scope.current === "X" ? $scope.xImg : $scope.oImg;
    //sets the clicked property of the clicked cell to true
    $scope.board[row][col].clicked = true;
    //sets the image according to current player on that cell
    $scope.board[row][col].image = $scope.image;
    //sets the play of the cell to the current play value
    $scope.board[row][col].play = $scope.current
  }
  
  $scope.toggleCell = function (row, col) {
    //if the clicked cell has not previously been clicked
    if (!$scope.board[row][col].clicked) {
      //set necessary properties on cell object with setAttributes method
      $scope.setAttributes(row, col);
      //increment turns played
      $scope.turns++;
      //call to calcDiagonal to check for a winning row
      $scope.calcDiagonal(row, col);
      //call to calcLinear to check for winning row
      $scope.calcLinear(row, col);
      //if the game has ended in a tie
      if ($scope.turns === Math.pow($scope.rows, 2) && !$scope.gameOver) {
        //set gameOver property to true
        $scope.gameOver = true;
        //set header to reflect tie
        $scope.header = "Cat's Game!";
      }
      //toggles current player between x and o
      $scope.current === "X" ? $scope.current = "O" : $scope.current = "X"; 
    }
  } 

  //initial createMatrix call to create and display board
  $scope.createMatrix();
})