'use strict';

angular.module('zimmApp')
  .controller('ChatappCtrl', function ($scope) {
    $scope.vis=0;

    $scope.visibility = function(){
      $scope.vis = ($scope.vis+1)%3;
      console.log($scope.vis);
    };
  });
