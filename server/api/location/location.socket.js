/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Location = require('./location.model');

exports.register = function(socket) {

  Location.schema.post('save', function (doc) {
    Location.populate(doc,{path :'author',select:'name'},function(err,message){
      var header = {room : doc.ioroom,};
      socket.to(doc.ioroom).emit('location:save', doc,header);
    });
  });

  Location.schema.post('remove', function (doc) {
    var header = {room : doc.ioroom}
    socket.to(doc.ioroom).emit('location:remove', doc,header);
  });
  
}
