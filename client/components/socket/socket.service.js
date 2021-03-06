/* global io */
'use strict';

angular.module('zimmApp')
  .factory('socket', function(socketFactory,$rootScope) {


    var socket = {
      socket: {},


      connect: function(token){
        this.disconnect();
        this.socket = socketFactory({
          ioSocket: io('', {
            // Send auth token on connection, you will need to DI the Auth service above
            'query': 'token=' + token,
            'forceNew': true,
            path: '/socket.io-client'
          })
        });
      },

      disconnect: function(){
        if(this.socket.disconnect){
          this.socket.disconnect(true);
        }

      },

      /**
       * Register listeners to sync an array with updates on a model
       *
       * Takes the array we want to sync, the model name that socket updates are sent from,
       * and an optional callback function after new items are updated.
       *
       * @param {String} modelName
       * @param {Array} array
       * @param {Function} cb
       */
      syncUpdates: function (modelName, array,filter, cb) {
        console.log(modelName, array,filter, cb);
        var socket = this.socket;
        cb = cb || angular.noop;

        /**
         * Syncs item creation/updates on 'model:save'
         */
        socket.on(modelName + ':save', function (item) {
          //if filter is passed and is not empty and item does not match return
          if (filter&&Object.keys(filter).length&&!_.find([item],filter)){console.log('no match',_.find([item],filter),[item],filter);return}
          if (!filter||!Object.keys(filter).length||_.find([item],filter)){console.log('ismatch',item)}
          var oldItem = _.find(array, {_id: item._id});
          var index = array.indexOf(oldItem);
          var event = 'created';

          // replace oldItem if it exists
          // otherwise just add item to the collection
          if (oldItem) {
            array.splice(index, 1, item);
            event = 'updated';
          } else {
            array.push(item);
          }

          cb(event, item, array);
        });

        /**
         * Syncs removed items on 'model:remove'
         */
        socket.on(modelName + ':remove', function (item) {
          var event = 'deleted';
          _.remove(array, {_id: item._id});
          cb(event, item, array);
        });
      },

      /**
       * Removes listeners for a models updates on the socket
       *
       * @param modelName
       */
      unsyncUpdates: function (modelName) {
        var socket = this.socket;
        socket.removeAllListeners(modelName + ':save');
        socket.removeAllListeners(modelName + ':remove');
      }
    };


    return socket;

  });
