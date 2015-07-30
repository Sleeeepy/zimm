'use strict';

angular.module('zimmApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
        {
          'title': 'Home',
          'link': '/',
          'state':'main'
        },
        {
          'title': 'ChatApp',
          'link': '/chatapp',
          'state':'chatapp.chats'
        },
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
