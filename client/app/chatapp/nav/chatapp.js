'use strict';

angular.module('zimmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('chatapp', {
        url: '/chatapp',
        templateUrl: 'app/chatapp/nav/chatapp.html',
        controller: 'ChatappCtrl'
      });
  });
