'use strict';

angular.module('zimmApp')
  .factory('contacts', function ($resource) {
    // Service logic
    // ...

    var  contacts = $resource('/user/:userId');

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
