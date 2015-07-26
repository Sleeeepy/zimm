'use strict';

angular.module('zimmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('chatapp.chats', {
        url: '/chatapp/chats',
        templateUrl: 'app/chatapp/chats/chats.html',
        controller: 'ChatsCtrl'
      });
  });
