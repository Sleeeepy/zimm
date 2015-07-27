'use strict';

angular.module('zimmApp')
  .controller('ChatsCtrl', function ($scope,chat) {
    $scope.chats= chat.conversations.get();
    console.log(chat);
  });
