//angular module to set as ng-app
angular.module('TicTacToe', [])
  //controller for the board container
  .controller('BoardController', function($scope) {
    //paths for x and o images
    $scope.xImg = "./x.jpg"
    $scope.oImg = "./o.jpg"
    //keeps track of which squares have been clicked
    $scope.squares = {
      one: false,
      two: false,
      three: false,
      four: false,
      five: false,
      six: false,
      seven: false,
      eight: false,
      nine: false
    }
    //first player will start as x
    $scope.current = "x"

    //function for ng-click on any square. Will toggle image and player status for each
    //sqaure on the board when clicked and update the current player as well. 
    $scope.toggleSquareImg = function (squareNumber) {
      if($scope.squares[squareNumber] === false) {
        var img = $scope.current === "x" ? $scope.xImg : $scope.oImg; 
        $scope.squares[squareNumber] = {clicked: true, player: $scope.current, img: img}; 
        $scope.current === "x" ? $scope.current = "o" : $scope.current = "x";
      }
    }
  })