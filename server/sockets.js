/**
 * Main application routes
 */

'use strict';
var socketIo = require('socket.io'),
    config = require('./config/environment');

module.exports = function(server) {
  
  var socket = initSocket(server,'/socket.io-client');



  return socket;
}

function initSocket(server,path){
  var options = {
                  serveClient: config.env !== 'production',
                  path: path
                };
  return socketIo(server,options);
}
