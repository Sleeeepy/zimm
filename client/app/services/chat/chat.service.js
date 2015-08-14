'use strict';

angular.module('zimmApp')
  .factory('Chat', function ($resource,socket,Auth) {



  var  chat = $resource('/api/chats/:id',{id: '@_id'});

  chat.message = $resource('/api/messages/:id',{id: '@_id'}, {
                            get: {cache:false}});



  var chatService = {

    init        : function(){
                    var self = this;
                    console.log('initilising chatservice');
                    if(this.active){return this;}
                    this.user = Auth.getCurrentUser();

                    this.getChats(function(chats){self.chats=chats;self.getMessages();console.log(self.chats);});

                    this.active = true;
                  },
    active      : false,
    user        : {},
    chats       : [],

    socket      : socket,

    getChats    : function(cb){
                    if(this.chats.length>0){return cb(this.chats);}
                    this.resource.chats.query({members:this.user._id},function(value){

                            //this.chats = value;
                            return cb(value);
                          });
                  },

    getMessages  : function(cb){
                      console.log('getting messages',this.chats);
                      for (var i=0;i<this.chats.length;i++){
                        this.resource.messages.query({chat:this.chats[i]._id},function(value){
                          console.log(value,value.length);
                        });
                      }
                  },

    resource     : {
                    chats    : $resource('/api/chats/:id',{id: '@_id'},
                                  {get: {cache:false}}),
                    messages : $resource('/api/messages/:id',{id: '@_id'},
                                  {get: {cache:false}})
                   }



  };
  console.log('invoking chatservice');
  chatService.init();

  return chat;


  });
