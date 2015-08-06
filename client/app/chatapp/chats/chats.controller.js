'use strict';

angular.module('zimmApp')
  .controller('ChatsCtrl', function ($scope,Chat,Modal,Auth) {
    //if(!Auth.isLoggedIn()){alert('asdf');}

    $scope.moment  = moment;
    $scope.chats   = [];
    getChats();

    $scope.delChat = delChat;

    $scope.delModal = Modal.confirm.delete(delChat);

    function getChats(){
      //$scope.chats = Chat.conversations.get();
      Chat.query({},function(value,responseHeaders){
        $scope.chats = $scope.chats.concat(value);
      });
    };


    function delChat(chat,$index) {
      Chat.delete({id:chat._id},function(value,respHeader){
          $scope.chats.splice($index,1);
      });
    };


  });
