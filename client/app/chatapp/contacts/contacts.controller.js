'use strict';

angular.module('zimmApp')
  .controller('ContactsCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.contacts = [
      {
        name:'Emma Morgan'
      },
      {
        name:'Elmar Zimmermann'
      },
      {
        name:'Brian Trauth'
      },
    ];
  });
