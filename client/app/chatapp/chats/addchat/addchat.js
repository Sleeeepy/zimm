'use strict';

angular.module('zimmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('addchat', {
        url: '/addchat',
        templateUrl: 'app/chatapp/chats/addchat/addchat.html',
        controller: 'AddchatCtrl'
      });
  });