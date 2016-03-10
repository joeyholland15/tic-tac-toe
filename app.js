//angular module to set as ng-app
angular.module('TicTacToe', [])
  //controller for the board container
  .controller('BoardController', function($scope) {
    //paths for x and o images
    $scope.xImg = "./x.jpg"
    $scope.oImg = "./o.jpg"

    //initialize variable to represent string to show when the game is over
    $scope.gameOver = false;

    //initialize turns variable to track how many turns have been played
    $scope.turns = 0; 

    //initializes current variable to track the current player (starts with x)
    $scope.current = "x"

    //the number of rows on the board (defaults to 3)
    $scope.rows = 3; 

    //initialize board matrix
    $scope.board = []; 

    $scope.createMatrix = function() {
      //generate arrays to represent board rows (as many as $scope.rows)
      for(var i = 0; i < $scope.rows; i++) {
        var row = [];
        //generate objects within those row arrays to represent cells
        for(var n = 0; n < $scope.rows; n++) {
          //give each cell a clicked status (each will be initialized as false)
          row[n] = {clicked: false}
          //assign sides for which each cell will need a border
          if(n !== 0) {
            row[n].right = true
          } 
          if (i !== 0) {
            row[n].bottom = true
          } 
          if (n !== $scope.rows - 1) {
            row[n].left = true
          } 
          if (i !== $scope.rows - 1) {
            row[n].top = true
          }
        }
        //push that row to the board matrix
        $scope.board.push(row)
      }
    }

    //function to clear the board after game ends, run on restart button click
    $scope.clearBoard = function() {
      //reset board matrix
      $scope.board = [];
      //reset the endGameString to hide it
      $scope.gameOver = false;
      //reset the current player to x
      $scope.current = "x";
      //re-create the matrix
      $scope.createMatrix();
    }

    $scope.calcLinear = function(row, col) {
      var colCount = 1;
      var rowCount = 1;
      var leftToRightCount = 1;
      var rightToLeftCount = 1;
      for(var i = 0; i < $scope.rows; i++) {
        if(i !== row && $scope.board[i][col].play === $scope.current) {
          colCount++
        }
        if(i !== col && $scope.board[row][i].play === $scope.current) {
          rowCount++
        }
      }
      if(colCount === $scope.rows || rowCount === $scope.rows) {
        $scope.gameOver = true;
      }
    }

    $scope.calcDiagonal = function(row, col, inRow) {
      var leftToRight = 1;
      var rightToLeft = 1;
      var length = $scope.board.length; 
      //$scope.board[row][col] is saved in play and is the one that was clicked
      var play = $scope.board[row][col].play;
      //result count, target is 5
      for(var i = 1; i < length; i++) {
        if(row - i >= 0 && col - i >= 0) {
          if($scope.board[row - i][col - i].play === $scope.board[row][col].play ) {
            leftToRight += 1;
          }
        }
        if(row + i < length && col + i < length) {
          if($scope.board[row + i][col + i].play === $scope.board[row][col].play) {
            leftToRight += 1
          }
        }
        if(row - i >= 0 && col + i < length) {
          if($scope.board[row - i][col + i].play === $scope.board[row][col].play ) {
            rightToLeft += 1;
          }
        }
        if(row + i < length && col - i >= 0) {
          if($scope.board[row + i][col - i].play === $scope.board[row][col].play ) {
            rightToLeft += 1
          }
        }
      }
      if(leftToRight === $scope.rows || rightToLeft === $scope.rows) {
        $scope.gameOver = true;
      } 
    }
    
    $scope.toggleCell = function(row, col) {
      //if the selected cell has not already been selected
      if(!$scope.board[row][col].clicked) {
        //variable to hold the current play
        var play = $scope.current;
        //set $scope image property to contain the appropriate image path
        $scope.image = $scope.current === "x" ? $scope.xImg : $scope.oImg;
        //sets the clicked property of the appropriate cell to true to ng-show image 
        $scope.board[row][col].clicked = true;
        //sets the image according to current player on that cell
        $scope.board[row][col].image = $scope.image;
        //sets the play of the cell to the current play value
        $scope.board[row][col].play = play
        $scope.calcDiagonal(row, col)
        $scope.calcLinear(row, col)
        //toggles current player between x and o
        $scope.current === "x" ? $scope.current = "o" : $scope.current = "x";
        //increment turns played
        $scope.turns++;
      }
    } 

    //initial createMatrix call to create and display board
    $scope.createMatrix();
  })