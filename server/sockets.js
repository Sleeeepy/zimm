/**
 * Main application routes
 */

'use strict';
//var emitters = require('./api/message/message.socket').emitters;



module.exports = function(Io) {

  //client API
  Io.on('connection',function(client){
    //change joinChat to subscribe
    client.on('chat:join',function(id){client.join('chat:'+id);});
    client.on('chat:leave',function(id){client.leave('chat:'+id);});
    
  });


}
