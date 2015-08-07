'use strict';

angular.module('zimmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('addchat', {
        url: '/chatapp/chats/add/:id',
        templateUrl: 'app/chatapp/chats/edit/addchat.html',
        controller: 'AddchatCtrl',
        params:{id:""}
      });
  });
