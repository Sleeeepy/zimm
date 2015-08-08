'use strict';

angular.module('zimmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('map', {
        url: '/map',
        templateUrl: 'app/chatapp/map/map.html',
        controller: 'MapCtrl'
      });
    $stateProvider
        .state('chatapp.map', {
          url: '/map',
          templateUrl: 'app/chatapp/map/map.html',
          controller: 'MapCtrl'
        });
  });
