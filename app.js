//angular module to set as ng-app
angular.module('TicTacToe', [])
  //controller for the board container
  .controller('BoardController', function($scope) {
    //paths for x and o images
    $scope.xImg = "./x.jpg"
    $scope.oImg = "./o.jpg"

    //initialize variable to represent string to show when the game is over
    $scope.gameOver;

    //initialize turns variable to track how many turns have been played
    $scope.turns = 0; 

    //initializes current variable to track the current player (starts with x)
    $scope.current = "x"

    //the number of rows on the board (defaults to 3)
    $scope.rows = 3; 

    //initialize board matrix
    $scope.board = []; 

    $scope.createBoard = function() {
      //initialize count, which acts as a running total for all cells
      var count = 0;
      //generate arrays to represent board rows (as many as $scope.rows)
      for(var i = 0; i < $scope.rows; i++) {
        var row = [];
        //generate objects within those row arrays 
        for(var n = 0; n < $scope.rows; n++) {
          //give each cell a clicked status (each will be initialized as false)
          //and a unique value provided by the incrementing count variable
          row[n] = {clicked: false, val: count++}
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

    //initial createBoard call to create and display board
    $scope.createBoard();

    $scope.calcWinner = function(row, col, totalInRow) {
      var hRow = 1;
      var vRow = 1;
      for(var i = 0; i < $scope.rows; i++) {
        if(i !== row && $scope.board[i][col].play === $scope.current) {
          hRow++
        }
        if(i !== row && $scope.board[row][i].play === $scope.current) {
          vRow++
        }
      }
      if(hRow === 5 || vRow === 5) {
        $scope.gameOver = 'GAME Over'
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
        //run function to see if this play has ended the game NEED TO CALL BEFORE CHANGING CURRENT
        $scope.calcWinner(row, col)
        //toggles current player between x and o
        $scope.current === "x" ? $scope.current = "o" : $scope.current = "x";
        //increment turns played
        $scope.turns++;
      }
    } 
  })