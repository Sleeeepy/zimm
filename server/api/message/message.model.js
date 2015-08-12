'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User'},
  chat: { type: Schema.Types.ObjectId, ref: 'Chat'},
  created: { type: Date, default: Date.now },
  text: String,
  active: Boolean
});

MessageSchema.virtual('ioroom').get(function(){
      //socket.io room to which model events are emitted
      return 'chat:' + this.chat;
    });

module.exports = mongoose.model('Message', MessageSchema);
