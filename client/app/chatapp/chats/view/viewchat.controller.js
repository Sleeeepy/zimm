'use strict';

angular.module('zimmApp')
  .controller('ViewchatCtrl', function ($scope,$stateParams,Chat,$http,socket,Auth) {
    // http://mistic100.github.io/angular-smilies/#usage

    $scope.user = Auth.getCurrentUser();

    $scope.moment = moment;
    $scope.bgs = ["list-group-item-info",
                  "list-group-item-success",
                  "list-group-item-primary",
                  "list-group-item-warning"]

    $scope.getColour = getColour;
    $scope.sendMsg = sendMsg;
    $scope.deleteMsg = delMsg;


    function getColour(msg){
      for (var i=0; i<$scope.chat.members.length;i++){
        if($scope.chat.members[i]._id===msg.author._id){return $scope.bgs[i]}
      }
    }

    function sendMsg() {
      if($scope.myMsg === '') {return;}
      new Chat.message({author: $scope.user,
                        chat:   $scope.chat,
                        text:   $scope.myMsg
                        })
                        .$save(function(obj){
        $scope.myMsg = '';
      });
    };

     function delMsg(msg) {
      Chat.message.delete({id:msg._id});
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });


    $scope.chat = Chat.get({id:$stateParams.id});
    $scope.messages = Chat.message.query({chat:$stateParams.id});
    socket.socket.emit('joinChat',$stateParams.id);
    socket.syncUpdates('message', $scope.messages);

    socket.socket.emit('test');
    socket.socket.on('welcome',function(data1,data2){console.log(data1,data2)})

// get all messages in chatapp state

  });
