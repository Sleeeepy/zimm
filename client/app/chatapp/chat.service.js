'use strict';

angular.module('zimmApp')
  .factory('chat', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var convs = [
      {
        img:'http://i.dailymail.co.uk/i/pix/2011/07/05/article-2011329-074AD98B000005DC-803_468x286.jpg',
        title:'Bar Banter',
        msg:{
          author:'Anna',
          text:'blabla',
          updated: new Date()-1000*60*4
        }
    },
    {
      img:'http://www.castlemalting.com/Publications/Recipes/Images/BelgianAmberBeer.png',
      title:'technically challenged',
      msg:{
        author:'Karim',
        text:'blabla',
        updated: new Date()
      }
  },
  {
    img:'http://mostbeautifulplacesintheworld.org/wp-content/uploads/2013/04/Manarola-a-small-town-in-Cinque-Terre-Italy.jpg',
    title:'Emma Morgan',
    msg:{
      author:'Emma',
      text:'blabla',
      updated: (new Date(2015,6,6))
    }
  }];

  var  chat = $resource('/api/chats/:chatId',{id: "@_id"});
  chat.conversations = {get: function(){ return convs;}}

/*
  chat.getLocation = function(){
    if (!this.userLocation){
      if (navigator.geolocation) {


			// Get the user's current position
			navigator.geolocation.getCurrentPosition(function(pos){
        this.userLocation = pos.coords;
      },
      function(){
        console.warn('ERROR(' + err.code + '): ' + err.message);
      });
			//console.log(pos.latitude + " " + pos.longitude);
			} else {
				alert('Geolocation is not supported in your browser');
			}
    }
    console.log(this.userLocation);


  };
  chat.getLocation();*/
  return chat;


  });
