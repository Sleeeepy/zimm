'use strict';

angular.module('zimmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('chatapp.chats', {
        url: '/chats',
        templateUrl: 'app/chatapp/chats/list/chats.html',
        controller: 'ChatsCtrl'
      });
  });
