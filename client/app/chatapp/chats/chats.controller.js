'use strict';

angular.module('zimmApp')
  .controller('ChatsCtrl', function ($scope,chat,Auth) {
    $scope.moment = moment;
    $scope.chats= chat.conversations.get();

    chat.query({},function(value,responseHeaders){
      $scope.chats = $scope.chats.concat(value);
      console.log(value);
    });


    $scope.user = Auth.getCurrentUser();

    $scope.addChat = function(title){
      title = title || "new Chat";
      var newChat = new chat({title:title});
      newChat.$save(function(obj){
        $scope.chats.push(obj);
        console.log(obj);

      });
    };
  });
