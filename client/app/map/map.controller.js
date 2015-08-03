'use strict';

angular.module('zimmApp')
  .controller('MapCtrl', function ($scope,chat) {
    $scope.message = 'Hello';
    var map;
    var marker;
    var loop;
    var canvas = document.getElementById('map-canvas');

    function initialize() {
      navigator.geolocation.getCurrentPosition(function(pos){
        var userLocation = {lat:pos.coords.latitude,
                            lng:pos.coords.longitude
                            };

        var mapOptions = {
          center: userLocation,
          zoom: 14
        };

        map = new google.maps.Map(canvas,mapOptions);
        marker = new google.maps.Marker({
                                          position: userLocation,
                                          map: map
                                        });


        //keepAdding();

      });
      //google.maps.Map.call(map,document.getElementById('map-canvas'),mapOptions);
    }
    $scope.initialize = initialize;

    $scope.addMarker = function(pos){
      pos = pos || {lat:51,lng:0.5}
      //var myLatlng = new google.maps.LatLng(-34.397+Math.random()*10,150.644+Math.random()*10);
      marker = new google.maps.Marker({
                      position: pos,
                      map: map,
                      title: 'Hello World!' + new Date()
                      });

    };
    var keepAdding = function(){
      marker.setMap(null);
      $scope.addMarker();

      loop = setTimeout(keepAdding,1000);
    }
    $scope.$on('$destroy', function() {
      // say goodbye to your controller here
      // release resources, cancel request...
      clearTimeout(loop);

    })


  });
