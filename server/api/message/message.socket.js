/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Message = require('./message.model');

exports.receivers     = {

}
//on event call cb with data and headers {room:roomname,name:value}
exports.emitters = {

  postSave: function(callback){
                Message.schema.post('save', function (doc) {
                  Message.populate(doc,{path:'author',select:'name'},function(err,message){
                    var header = {room: 'chat:'+message.chat,
                                  chat: message.chat
                                  };
                    callback(message,header);
                  });
                });
            },
  postRemove: function(callback){
                Message.schema.post('remove', function (doc) {
                  var header = {room : 'chat:'+doc.chat}
                  callback(doc,header);
                });
            }







}
