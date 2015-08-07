'use strict';

angular.module('zimmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('viewchat', {
        url: '/chatapp/chats/view/:id',
        templateUrl: 'app/chatapp/chats/view/viewchat.html',
        controller: 'ViewchatCtrl',
        params:{id:""}
      });
  });
