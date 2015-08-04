'use strict';

angular.module('zimmApp')
  .controller('ChatsCtrl', function ($scope,Chat,Auth) {

    $scope.chats = [];
    $scope.moment     = moment;
    $scope.user = Auth.getCurrentUser();
    getChats();

    $scope.addChat    = addChat;
    $scope.deleteChat = deleteChat;


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

    function deleteChat(chat,$index) {
       Chat.delete({id:chat._id},function(value,respHeader){
         $scope.chats.splice($index,1);
       });
    };




  });
