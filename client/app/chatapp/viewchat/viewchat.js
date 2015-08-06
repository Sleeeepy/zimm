'use strict';

angular.module('zimmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('viewchat', {
        url: '/viewchat/:id',
        templateUrl: 'app/chatapp/viewchat/viewchat.html',
        controller: 'ViewchatCtrl',
        params:{id:""}
      });
  });
