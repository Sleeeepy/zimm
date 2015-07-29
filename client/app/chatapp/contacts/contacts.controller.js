'use strict';

angular.module('zimmApp')
  .controller('ContactsCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.contacts = [
      {name:'Heinz Doof'},
      {name:'Peer Teer'},
      {name:'Hans Wurst'},
      {name:'Bugs Bunny'},
      {name:'Donald Duck'},
      {name:'Michey Mouse'},
    ];
  });
