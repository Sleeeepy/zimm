'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChatSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  members: [{type: Schema.ObjectId, ref:'User'}]
});

module.exports = mongoose.model('Chat', ChatSchema);
