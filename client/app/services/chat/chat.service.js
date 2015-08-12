'use strict';

angular.module('zimmApp')
  .factory('Chat', function ($resource) {



  var  chat = $resource('/api/chats/:id',{id: "@_id"});

  chat.message = $resource('/api/messages/:id',{id: "@_id"}, {
                            get: {cache:false}});


  return chat;


  });
