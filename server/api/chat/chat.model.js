'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChatSchema = new Schema({
  title: String,
  info: String,
  active: Boolean,
  members: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  created: { type: Date, default: Date.now },
  updated:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);
