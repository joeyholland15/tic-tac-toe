//angular module to set as ng-app
angular.module('TicTacToe', [])
  //controller for the board container
  .controller('BoardController', function($scope) {
    //paths for x and o images
    $scope.xImg = "./x.jpg"
    $scope.oImg = "./o.jpg"

    //initialize variable to represent string to show when the game is over
    $scope.endGameString;

    //initialize turns variable to track how many turns have been played
    $scope.turns = 0; 

    //initializes current variable to track the current player (starts with x)
    $scope.current = "x"

    //the number of rows on the board (defaults to 3)
    $scope.rows = 3; 

    //initialize board matrix
    $scope.board = []; 

    $scope.createBoard = function() {
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

    $scope.clearBoard = function() {
      var boardContainer = angular.element(document.querySelector('#board .row'));
      boardContainer.empty();
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
        $scope.endGameString = 'GAME Over'
      }
    }

    $scope.calcDiagonal = function(row, col) {
      console.log('in here');
      var leftToRightCount = 1;
      var rightToLeftCount = 1;
      var max = row >= col ? row : col;
      for(var i = 1; i < $scope.rows - max; i++) {
        console.log($scope.board[row - i][col + i], $scope.board[row + i][col - i], $scope.board[row - i][col - i], $scope.board[row + i][col + i]);

        // var rightToLeftRow = $scope.board[row - i][col + i] ? $scope.board[row - i][col + i].play : undefined
        // var rightToLeftCol = $scope.board[row + i][col - i] ? $scope.board[row + i][col - i].play : undefined
        // var leftToRightRow = $scope.board[row - i][col - i] ? $scope.board[row - i][col - i].play : undefined
        // var leftToRightCol = $scope.board[row + i][col + i] ? $scope.board[row + i][col + i].play : undefined
        // console.log($scope.board[row - i][col + i], $scope.board[row + i][col - i], $scope.board[row - i][col - i], $scope.board[row + i][col + i]);
        // if((rightToLeftRow && rightToLeftRow === $scope.current) || (rightToLeftCol && rightToLeftRow === $scope.current)) {
        //   rightToLeftCount++;
        // } 
        // if((leftToRightRow && leftToRightRow === $scope.current) || (leftToRightCol && leftToRightCol === $scope.current)) {
        //   leftToRightCount++;
        // }
        // if(leftToRightCount === $scope.rows || rightToLeftCount === $scope.rows) {
        //   $scope.endGameString = 'GAME Over'
        // }
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
        //$scope.calcLinear(row, col)
        $scope.calcLinear(row, col)
        //toggles current player between x and o
        $scope.current === "x" ? $scope.current = "o" : $scope.current = "x";
        //increment turns played
        $scope.turns++;
      }
    } 

    //initial createBoard call to create and display board
    $scope.createBoard();
  })