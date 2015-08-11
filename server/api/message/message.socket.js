/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Message = require('./message.model');

exports.API     = {
  
}

exports.events = {

  postSave: function(callback){
                Message.schema.post('save', function (doc) {
                  Message.populate(doc,{path:'author',select:'name'},function(err,message){
                    var room = 'chat:'+message.chat;
                    callback(room,message);
                  });
                });
            },
  postRemove: function(callback){
                Message.schema.post('remove', function (doc) {
                  var room = 'chat:'+doc.chat;
                  callback(room,doc);
                });
            }







}
