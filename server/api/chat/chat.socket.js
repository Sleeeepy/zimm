/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Chat = require('./chat.model');

exports.register = function(socket) {
  Chat.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Chat.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });

  joinRooms(socket);
}

function onSave(socket, doc, cb) {
  socket.emit('chat:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('chat:remove', doc);
}



function joinRooms(socket,cb){
  //find all chats socket.user is member of and join socketio room
  //emit on changes to chat and message model
  Chat.find({members:socket.user},function (err, chats) {

    if(err) { return err }
    for (var i=0;i<chats.length;i++){
      console.log(socket.user.name + ' joining room: ' +'Chat-'+chats[i].id);
      socket.join('Chat-'+chats[i]._id);
    }
  });
}
