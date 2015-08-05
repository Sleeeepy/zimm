'use strict';

angular.module('zimmApp')
  .controller('ChatsCtrl', function ($scope,Chat,Modal) {

    $scope.moment  = moment;
    $scope.chats   = [];
    getChats();

    $scope.addChat = addChat;
    $scope.delChat = delChat;

    $scope.delModal = Modal.confirm.delete(delChat);

    function getChats(){
      $scope.chats = Chat.conversations.get();
      Chat.query({},function(value,responseHeaders){
        $scope.chats = $scope.chats.concat(value);
      });
    };

    function addChat(title){
      title = title || "new Chat";
      new Chat({title:title}).$save(function(obj){
        $scope.chats.push(obj);
      });
    };

    function delChat(chat,$index) {
      console.log(chat,$index);


        Chat.delete({id:chat._id},function(value,respHeader){
          $scope.chats.splice($index,1);
        });


    };



  });
