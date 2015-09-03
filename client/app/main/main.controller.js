'use strict';

angular.module('zimmApp')
  .controller('MainCtrl', function ($scope, $http,socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
    navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);
    console.log('navigator.getUserMedia: ',navigator.getUserMedia);
    function gotStream(stream) {
      window.myaudio = stream;
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      var audioContext = new AudioContext();

      // Create an AudioNode from the stream
      var mediaStreamSource = audioContext.createMediaStreamSource(stream);

      // Connect it to destination to hear yourself
      // or any other node for processing!
      mediaStreamSource.connect(audioContext.destination);
    }

    navigator.getUserMedia({
      audio: true
    }, gotStream,function(){});
  });
