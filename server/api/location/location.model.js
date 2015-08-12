'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationSchema = new Schema({
  name: String,
  info: String,
  role: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  chats: [{ type: Schema.Types.ObjectId, ref: 'Chat'}], // how to group locations chat or user????
  geo: {type: { type: String, default: 'Point' }, coordinates: []},
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  active: Boolean
});

LocationSchema.index({ geo: '2dsphere' });

LocationSchema.virtual('ioroom').get(function(){
      //socket.io room to which model events are emitted
      return 'chat:' + this.chat;
    });

module.exports = mongoose.model('Location', LocationSchema);
