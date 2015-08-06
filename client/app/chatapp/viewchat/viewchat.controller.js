'use strict';

angular.module('zimmApp')
  .controller('ViewchatCtrl', function ($scope,$stateParams) {
    $scope.chat = $stateParams.chat;
  });
