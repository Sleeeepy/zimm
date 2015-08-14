/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment'),
    User = require('../api/user/user.model'),
    socketioJwt = require('socketio-jwt');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {


  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // insert client API below
  require('../api/message/message.socket').api(socket);

}

//middleware
function setUser(socket,next){
  if(!socket.decoded_token){return next(new Error('missing token'))}
  var userId = socket.decoded_token._id;
  User.findById(userId, function (err, user) {
    if (err) return next(err);
    //if (!user) return res.status(401).send('Unauthorized');
    socket.user = user;
    next();
  });
}


module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  socketio.use(function(socket,next){
    console.log('incoming socket connection, authenticating....');
    next();
  });
  socketio.use(socketioJwt.authorize({
                secret: config.secrets.session,
                handshake: true
                })
  );

  socketio.use(setUser);

  // Insert sockets below
  require('../api/location/location.socket').register(socketio);
  require('../api/chat/chat.socket').register(socketio);
  require('../api/message/message.socket').register(socketio);
  require('../api/thing/thing.socket').register(socketio);

  socketio.on('connection', function (socket) {
      
      socket.address = socket.handshake.address !== null ?
              socket.handshake.address + ':' + socket.handshake.address.port :
              process.env.DOMAIN;

      socket.connectedAt = new Date();

      // Call onDisconnect.
      socket.on('disconnect', function () {
        onDisconnect(socket);
        console.info('[%s] DISCONNECTED', socket.address);
      });

      // Call onConnect.
      onConnect(socket);
      console.info('[%s] CONNECTED', socket.address);


      });



};
