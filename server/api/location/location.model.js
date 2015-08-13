'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationSchema = new Schema({
  name: String,
  info: String,
  role: String,
  geo: {
    'type': {type: String, enum: "Point", default: "Point"},
    coordinates: { type: [Number],   default: [0,0]}
  },
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  chats: [{ type: Schema.Types.ObjectId, ref: 'Chat'}], // how to group locations chat or user????
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  visible: { type: Boolean, default: true},
  active:  {type: Boolean, default: true}
});

LocationSchema.index({ geo: '2dsphere' });

LocationSchema.virtual('ioroom').get(function(){
      //socket.io room to which model events are emitted
      return 'chat:' + this.chat;
    });

module.exports = mongoose.model('Location', LocationSchema);
