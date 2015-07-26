'use strict';

angular.module('zimmApp')
  .controller('ChatsCtrl', function ($scope) {
    $scope.chats=[
      {
        img:'http://i.dailymail.co.uk/i/pix/2011/07/05/article-2011329-074AD98B000005DC-803_468x286.jpg',
        title:'Bar Banter',
        msg:{
          author:'Anna',
          text:'blabla',
          time: new Date()
        }
    },
    {
      img:'http://www.castlemalting.com/Publications/Recipes/Images/BelgianAmberBeer.png',
      title:'technically challenged',
      msg:{
        author:'Karim',
        text:'blabla',
        time: new Date()
      }
  },
  {
    img:'http://mostbeautifulplacesintheworld.org/wp-content/uploads/2013/04/Manarola-a-small-town-in-Cinque-Terre-Italy.jpg',
    title:'Emma Morgan',
    msg:{
      author:'Emma',
      text:'blabla',
      time: (new Date(2015,6,6))
    }
}
  ];
  });
