//angular module to set as ng-app
angular.module('TicTacToe', [])
  //controller for the board container
  .controller('BoardController', function($scope) {
    //paths for x and o images
    $scope.xImg = "./x.jpg"
    $scope.oImg = "./o.jpg"
    //first player will start as x
    $scope.current = "x"
    //function for toggling the current player between x and o
    $scope.toggleCurrent = function() {
      $scope.current === "x" ? $scope.current = "o" : $scope.current = "x";
    }
  })