//angular module to set as ng-app
angular.module('TicTacToe', [])
  //controller for the board container
  .controller('BoardController', function($scope) {
    //paths for x and o images
    $scope.xImg = "./x.jpg"
    $scope.oImg = "./o.jpg"

    $scope.image = "./x.jpg";

    //the number of rows on the board (defaults to 3)
    $scope.rows = 5; 

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
    
    console.log($scope.board);

    // object that tracks each of the nine squares. Properties include
    // whether or not the square has been clicked, adjacent squares needed
    // to check whether or not a click won the game, and which player (x or o)
    // clicked on it. 
    // $scope.squares = {
    //   one: {
    //     clicked: false, 
    //     vertical: ['two','four'], 
    //     horizontal: ['two','three'], 
    //     diagonal: ['five', 'nine']
    //   },
    //   two: {
    //     clicked: false, 
    //     vertical: ['five','eight'], 
    //     horizontal: ['one','three'], 
    //   },
    //   three: {
    //     clicked: false, 
    //     vertical: ['six','nine'], 
    //     horizontal: ['one','two'], 
    //     diagonal: ['five', 'seven']
    //   },
    //   four: {
    //     clicked: false, 
    //     vertical: ['one','seven'], 
    //     horizontal: ['five','six'], 
    //   },
    //   five: {
    //     clicked: false,
    //     vertical: ['two','eight'], 
    //     horizontal: ['four','six'], 
    //     diagonal: ['one', 'nine', 'three', 'seven']
    //   },
    //   six: {
    //     clicked: false, 
    //     vertical: ['three','nine'], 
    //     horizontal: ['four','five'], 
    //   },
    //   seven: {
    //     clicked: false, 
    //     vertical: ['four','one'], 
    //     horizontal: ['eight','nine'], 
    //     diagonal: ['five', 'three']
    //   },
    //   eight: {
    //     clicked: false, 
    //     vertical: ['two','five'], 
    //     horizontal: ['seven','nine'], 
    //   },
    //   nine: {
    //     clicked: false, 
    //     vertical: ['three','six'], 
    //     horizontal: ['seven','eight'], 
    //     diagonal: ['five', 'one']
    //   },
    // }

    //keeps track of how many turns have been played
    $scope.turns = 0; 

    //first player will start as x
    $scope.current = "x"

    //boolean variable to keep track of whether or not the game is over
    $scope.gameOver;

    //function to check to see if the game is over, whether there is a winner or a tie
    $scope.isOver = function(squareNumber) {
      console.log($scope.turns);
      var squares = $scope.squares
      var square = squares[squareNumber];
      var h = square.horizontal;
      var v = square.vertical;
      var d = square.diagonal; 
      var winnerString = 'Congratulations! '+ square.player.toUpperCase() + ' Wins!';
      var tieString = 'Tie!'
      if($scope.turns === 9) {
        $scope.gameOver = tieString;
      }
      if(square.player === squares[h[0]].player && square.player === squares[h[1]].player) {
        $scope.gameOver = winnerString;
      } else if (square.player === squares[v[0]].player && square.player === squares[v[1]].player) {
        $scope.gameOver = winnerString;
      } else if (squareNumber === 'five' && square.player === squares[d[0]].player && square.player === squares[d[1]].player) {
        $scope.gameOver = winnerString;
      } else if (squareNumber === 'five' && square.player === squares[d[2]].player && square.player === squares[d[3]].player) {
        $scope.gameOver = winnerString;
      } else if (square.player === squares[d[0]].player && square.player === squares[d[1]].player) {
        $scope.gameOver = winnerString;
      }
    }

    //function for ng-click on any square. Will toggle image and player status for each
    //sqaure on the board when clicked and update the current player as well. 
    $scope.toggleSquareImg = function (squareNumber) {
      $scope.turns++;
      var square = $scope.squares[squareNumber] 
      if(square.clicked === false) {
        var img = $scope.current === "x" ? $scope.xImg : $scope.oImg; 
        square.clicked = true;
        square.player = $scope.current
        square.img = img; 
        $scope.current === "x" ? $scope.current = "o" : $scope.current = "x";
        $scope.isOver(squareNumber)
      }
    }
  })