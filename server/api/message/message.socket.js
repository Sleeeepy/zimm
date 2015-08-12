/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Message = require('./message.model');


exports.register = function(socket) {

  Message.schema.post('save', function (doc) {
    Message.populate(doc,{path :'author',select:'name'},function(err,message){
      var header = {room : doc.ioroom};
      socket.to(doc.ioroom).emit('message:save', doc,header);
    });
  });

  Message.schema.post('remove', function (doc) {
    var header = {room : doc.ioroom}
    socket.to(doc.ioroom).emit('message:remove', doc,header);
  });


}
  //client socket.io API
exports.api = function(client){

  //create a new message in db
  client.on('message:post',function(data){
    if(client.user._id!==data.author._id){
      client.emit('fail','access denied');
    }else{
      Message.create(data, function(err, message) {
        if(err) { client.emit('error',err); }
        client.emit('success');
      });

    }

  });
  //update an existing message in db
  client.on('message:put',function(chat){});




}
