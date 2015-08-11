/**
 * Main application routes
 */

'use strict';
var messageEvents = require('./api/message/message.socket').events;

module.exports = function(Io) {

  //client API
  Io.on('connection',function(client){
    //change joinChat to subscribe
    client.on('joinChat',function(id){client.join('chat:'+id);});
    client.on('leaveChat',function(data){client.leave('chat:'+data);});
    client.on('test',function(){client.emit('welcome',1,2)});
  });

  //server events
  messageEvents.postSave(function(room,message){Io.to(room).emit('message:save',message)})
  messageEvents.postRemove(function(room,message){Io.to(room).emit('message:remove',message)})
}
