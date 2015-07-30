'use strict';

angular.module('zimmApp')
  .controller('ChatsCtrl', function ($scope,chat,Auth) {
    $scope.moment = moment;
    $scope.chats= chat.conversations.get();
    console.log(chat);

    $scope.user = Auth.getCurrentUser();
  });
