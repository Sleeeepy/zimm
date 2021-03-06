/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var socketIo = require('socket.io');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var Io = socketIo(server, {serveClient: config.env !== 'production',path:'/socket.io-client'});

//var sockets = require('./sockets')(server,config);

require('./config/express')(app);
require('./routes')(app);
require('./config/socketio')(Io);
require('./sockets')(Io);

// Start server
server.listen(config.port, function () { //, config.ip
	console.log('IP: '+ config.ip)
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
