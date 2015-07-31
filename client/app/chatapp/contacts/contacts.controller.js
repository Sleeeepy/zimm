'use strict';

angular.module('zimmApp')
  .controller('ContactsCtrl', function ($scope,contacts) {
    $scope.contacs = [];
    contacts.query({},function(value, responseHeaders){
      $scope.contacts = value;
      console.log(value);
    });


    $scope.addContact = function (){
      $scope.contacts.push({name:'Pinco Pallino'});
      /*
      var newContact = new contacts();
      newContact.name = 'Pinco Pallino';

      newContact.$save(function(obj,response){
        $scope.contacts.push(obj);
      });
      */
    };

  });
