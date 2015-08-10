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


    function getColour(msg){

      for (var i=0; i<$scope.chat.members.length;i++){

        if($scope.chat.members[i]._id===msg.author._id){return $scope.bgs[i]}

      }
    }

    Chat.get({id:$stateParams.id},function(value,respHeader){
       $scope.chat =  value;





       $scope.sendMsg = sendMsg;



       function sendMsgf(){
         $scope.messages.push({created:new Date(),text:$scope.myMsg,author:"Elmar"});
         $scope.myMsg ="";
       };

// socket messages synching


       $http.get('/api/messages/chat/'+$scope.chat._id).success(function(messages) {
         $scope.messages = messages;
         socket.syncUpdates('message', $scope.messages);
       });

       function sendMsg() {
         if($scope.messages === '') {
           return;
         }
         $http.post('/api/messages', {author:$scope.user,chat:$scope.chat, text:  $scope.myMsg });
         $scope.myMsg = '';
       };

       $scope.deleteMsg = function(msg) {
         $http.delete('/api/messages/' + msg._id);
       };

       $scope.$on('$destroy', function () {
         socket.unsyncUpdates('message');
       });
    });
  });
