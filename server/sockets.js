/**
 * Main application routes
 */

'use strict';
var emitters = require('./api/message/message.socket').emitters;

module.exports = function(Io) {

  //client API
  Io.on('connection',function(client){
    //change joinChat to subscribe
    client.on('chat:join',function(id){client.join('chat:'+id);});
    client.on('chat:leave',function(id){client.leave('chat:'+id);});
  });

  //server events
  publish(emitters.postSave,'message:save');
  publish(emitters.postRemove,'message:remove');


function publish(serverEvent, message){

  //when an event triggers it calls cb with data and header {room: String, chat:chat._id}
  serverEvent(function(data,header){
    Io.to(header.room).emit(message,data,header);
  })
}
}
