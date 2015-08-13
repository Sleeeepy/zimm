'use strict';

angular.module('zimmApp')
  .controller('ViewchatCtrl', function ($scope,$stateParams,Chat,$http,socket,Auth) {
    // http://mistic100.github.io/angular-smilies/#usage

    var chatId = $stateParams.id;

    $scope.user = Auth.getCurrentUser();
    $scope.newMsg = {
      author: $scope.user,
      text: '',
      chat: chatId
    }

    $scope.moment = moment;
    $scope.bgs = ['list-group-item-info',
                  'list-group-item-success',
                  'list-group-item-primary',
                  'list-group-item-warning'];

    $scope.getColour = getColour;
    $scope.sendMsg = sendMsg;
    $scope.sendMsg2 = sendMsg2;
    $scope.deleteMsg = delMsg;

    $scope.$watchCollection('messages', function() {
      //alert('hey, myVar has changed!');
    });


    function getColour(msg) {
      for (var i = 0; i < $scope.chat.members.length; i++) {
        if ($scope.chat.members[i]._id === msg.author._id) {
          return $scope.bgs[i];
        }
      }
    }

    function sendMsg() {
      if ($scope.newMsg.text === '') {return;}
      new Chat.message($scope.newMsg).$save(function(obj) {
          $scope.newMsg.text = '';
        });
    };

    function sendMsg2() {
      if ($scope.newMsg.text === '') {return;}
      socket.socket.emit('message:post',newMsg);
      $scope.newMsg.text = '';
    };

     function delMsg(msg) {
      Chat.message.delete({id:msg._id});
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
      socket.socket.emit('chat:leave',$stateParams.id);
    });


    Chat.get({id:$stateParams.id},function(chat){
      $scope.chat = chat;
      $scope.messages = Chat.message.query({chat:$stateParams.id});
      socket.socket.emit('chat:join',$stateParams.id);
      socket.syncUpdates('message', $scope.messages);
    });


    socket.socket.emit('test');
    socket.socket.on('welcome',function(data1,data2){console.log(data1,data2)})

// get all messages in chatapp state

  });
