//angular module to set as ng-app
angular.module('TicTacToe', [])
  //controller for the board container
  .controller('BoardController', function($scope) {
    //paths for x and o images
    $scope.xImg = "./x.jpg"
    $scope.oImg = "./o.jpg"
    //keeps track of which squares have been clicked
    $scope.squares = {
      one: {
        clicked: false, 
        vertical: ['two','four'], 
        horizontal: ['two','three'], 
        diagonal: ['five', 'nine']
      },
      two: {
        clicked: false, 
        vertical: ['five','eight'], 
        horizontal: ['one','three'], 
      },
      three: {
        clicked: false, 
        vertical: ['six','nine'], 
        horizontal: ['one','two'], 
        diagonal: ['five', 'seven']
      },
      four: {
        clicked: false, 
        vertical: ['one','seven'], 
        horizontal: ['five','six'], 
      },
      five: {
        clicked: false,
        vertical: ['two','eight'], 
        horizontal: ['four','six'], 
        diagonal: ['one', 'nine', 'three', 'seven']
      },
      six: {
        clicked: false, 
        vertical: ['three','nine'], 
        horizontal: ['four','five'], 
      },
      seven: {
        clicked: false, 
        vertical: ['four','one'], 
        horizontal: ['eight','nine'], 
        diagonal: ['five', 'three']
      },
      eight: {
        clicked: false, 
        vertical: ['two','five'], 
        horizontal: ['seven','nine'], 
      },
      nine: {
        clicked: false, 
        vertical: ['three','six'], 
        horizontal: ['seven','eight'], 
        diagonal: ['five', 'one']
      },
    }

    //first player will start as x
    $scope.current = "x"

    //boolean variable to keep track of whether or not the game is over
    $scope.gameOver = false;

    //function to check to see if the game is over, whether there is a winner or a tie
    $scope.isOver = function(squareNumber) {
      var squares = $scope.squares;
    }

    //function for ng-click on any square. Will toggle image and player status for each
    //sqaure on the board when clicked and update the current player as well. 
    $scope.toggleSquareImg = function (squareNumber) {
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