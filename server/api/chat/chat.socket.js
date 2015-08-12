/**
 * Broadcast updates to client when the model changes
 */
'use strict';

var Chat = require('./chat.model');


exports.register = function(socket) {


  // server events

  Chat.schema.post('save', function(doc) {
    var header = {
      room: doc.ioroom,
    };
    socket.to(doc.io.room).emit('chat:save', doc, header);
  });

  Chat.schema.post('remove', function(doc) {
    var header = {
      room: doc.ioroom,
    };
    socket.to(doc.io.room).emit('chat:remove', doc, header);
  });


  //client API

  //create new chat in DB
  socket.on('chat:post',function(chat){});

  //update an existing chat in DB
  socket.on('chat:put',function(chat){});




}
