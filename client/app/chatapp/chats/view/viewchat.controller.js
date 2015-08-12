'use strict';

angular.module('zimmApp')
  .controller('ViewchatCtrl', function ($scope,$stateParams,Chat,$http,socket,Auth) {
    // http://mistic100.github.io/angular-smilies/#usage

    $scope.user = Auth.getCurrentUser();

    $scope.moment = moment;
    $scope.bgs = ['list-group-item-info',
                  'list-group-item-success',
                  'list-group-item-primary',
                  'list-group-item-warning'];

    $scope.getColour = getColour;
    $scope.sendMsg = sendMsg;
    $scope.sendMsg2 = sendMsg2;
    $scope.deleteMsg = delMsg;



    function getColour(msg) {
      for (var i = 0; i < $scope.chat.members.length; i++) {
        if ($scope.chat.members[i]._id === msg.author._id) {
          return $scope.bgs[i];
        }
      }
    }

    function sendMsg() {
      if ($scope.myMsg === '') {
        return;
      }
      var newMsg = {
          author: $scope.user,
          chat: $scope.chat,
          text: $scope.myMsg
        }
      new Chat.message(newMsg)
        .$save(function(obj) {
          $scope.myMsg = '';
        });



    };
    function sendMsg2() {
      if ($scope.myMsg === '') {
        return;
      }
      var newMsg = {
          author: $scope.user,
          chat: $scope.chat,
          text: $scope.myMsg
        }

      socket.socket.emit('message:post',newMsg);
      $scope.myMsg = '';
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
