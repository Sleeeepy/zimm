'use strict';

angular.module('zimmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('chatapp.contacts', {
        url: '/chatapp/contacts',
        templateUrl: 'app/chatapp/contacts/contacts.html',
        controller: 'ContactsCtrl'
      });
  });
