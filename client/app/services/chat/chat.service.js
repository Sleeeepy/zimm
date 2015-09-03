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
                    //if(this.active){return this;}
                    self.user = Auth.getCurrentUser();

                    self.getChats(function(){
                      self.getMessages(function(){
                        console.log('self.chats',self.chats);
                      });
                    });

                    self.active = true;
                  },
    active      : false,
    user        : {},
    chats       : [],

    socket      : socket,

    getChatById: function(id){
                    return _.find(this.chats, {_id: id});
                  },

    getChats    : function(cb){
                    var self = this;
                    if(self.chats.length>0){return cb(self.chats);}
                    self.resource.chats.query({members:self.user._id},function(value){
                            //self.chats = value;
                            self.chats = self.chats.concat(value);
                            console.log('inservice',self.chats);
                            return cb(self.chats);
                          });
                  },

    getMessages  : function(cb){
                      var self = this,
                          count = 0;

                      function asyncMessages(i){
                        self.resource.messages.query({chat:self.chats[i]._id},function(array){
                            self.chats[i].messages = array;
                            self.socket.socket.emit('chat:join',self.chats[i]._id);
                            self.socket.syncUpdates('message',
                                                    self.chats[i].messages,
                                                    {chat:self.chats[i]._id});
                            count+1<self.chats.length ? count++ : cb()
                            //if(++count===self.chats.length){cb()}
                        });
                      }
                      for (var i=0;i<this.chats.length;i++){
                        asyncMessages(i);
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
  chatService.init(); //needs to be promise
  chat.chatService = chatService;
  return chat;


  });
