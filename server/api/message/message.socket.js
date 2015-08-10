/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Message = require('./message.model');

exports.register = function(socket) {
  Message.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Message.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  Message.findById(doc._id)
  .populate('author','name')
  .exec(function (err, doc) {
    if(err) { return  }
    socket.to('Chat-'+doc.chat).emit('message:save', doc);
    //socket.emit('message:save', doc);
  });
  //socket.emit('message:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('message:remove', doc);
}
