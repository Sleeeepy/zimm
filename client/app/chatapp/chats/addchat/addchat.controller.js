'use strict';

angular.module('zimmApp')
  .controller('AddchatCtrl', function ($scope,$state,$stateParams, Modal, Contacts, Chat,$timeout) {

    if($stateParams.id==='asdf'){console.log($stateParams.id)}

    $scope.chat = {
                    title: "",
                    members: []
                  };
    $scope.contacts = [];
    getContacts();
    $scope.warning="";

    $scope.saveChat  = saveChat;

    $scope.addMember = addMember;
    $scope.remMember = remMember;

    //$scope.delModal = Modal.confirm.delete(delChat);

    function saveChat(){
      if($scope.chat.title.length<1){
        $scope.warning = "Please enter a title"
        $timeout(function(){$scope.warning="";},3000)
        return
      }
      new Chat($scope.chat).$save(function(obj){
        console.log(obj);
        $state.go('chatapp.chats');
      });
    };


    function getContacts(){
      Contacts.query({},function(value,responseHeaders){
        $scope.contacts = value;
      });
    }

    function addMember(contact, $index){
      $scope.filter ="";
      $scope.chat.members.push(contact);
      $scope.contacts.splice($index,1);
    }

    function remMember(member,$index){
      $scope.contacts.push(member);
      $scope.chat.members.splice($index,1);
    }



  });
