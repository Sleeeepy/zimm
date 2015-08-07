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

module.exports = mongoose.model('Message', MessageSchema);
