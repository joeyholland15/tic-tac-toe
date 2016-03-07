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
    $scope.toggleSquareImg = function (squareNumber) {
      var img = $scope.current === "x" ? $scope.xImg : $scope.oImg; 
      $scope.squares[squareNumber] = {clicked: true, player: $scope.current, img: img}; 
      console.log('SQAURES', $scope.squares)
      $scope.current === "x" ? $scope.current = "o" : $scope.current = "x";
    }
  })