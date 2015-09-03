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
    function gotStream(stream) {
      window.myaudio = stream;
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      var audioContext = new AudioContext();

      // Create an AudioNode from the stream
      var mediaStreamSource = audioContext.createMediaStreamSource(stream);
      attachMediaStream(video1, stream);
      attachMediaStream(video2, stream);
      //$scope.video = stream;
      // Connect it to destination to hear yourself
      // or any other node for processing!
      //mediaStreamSource.connect(audioContext.destination);
    }
    console.log('devices',window.devices = navigator.mediaDevices.enumerateDevices());
    navigator.agetUserMedia({
      audio: false, video:true
    }, gotStream,function(){});
    var video1 = document.getElementById('vid1'),
        video2 = document.getElementById('vid2');
    // Attach a media stream to an element.
    function attachMediaStream(element, stream) {
    console.log("Attaching media stream");
    element.mozSrcObject = stream;
    //element.play();
  };


  });
