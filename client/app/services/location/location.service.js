'use strict';

angular.module('zimmApp')
  .factory('Location', function ($interval) {
    // Service logic
    var userLocation;
    function updateLocation() {
      navigator.geolocation.getCurrentPosition(function(pos){
              userLocation = {lat:pos.coords.latitude,
                            lng:pos.coords.longitude
                            };
              console.log(userLocation);
      });
    }

    var loop;

    function startUpdate(){
      loop = $interval(updateLocation,3000);
      console.log(loop);
    }

    function stopUpdate(){
      $interval.cancel(loop);
    }
    console.log('asdf');
    // Public API here
    startUpdate();
    return {
      startUpdate: startUpdate,
      stopUpdate:stopUpdate,
      get: userLocation
    };
  });
