'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationSchema = new Schema({
  name: String,
  info: String,
  role: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  geo: {type: { type: String, default: 'Point' }, coordinates: []},
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  active: Boolean
});

LocationSchema.index({ geo: '2dsphere' });

module.exports = mongoose.model('Location', LocationSchema);
