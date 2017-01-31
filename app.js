var app = angular.module("iChatApp" , ['ngRoute'])
.constant('generalConfig' ,{
  config : {
      apiKey: "AIzaSyCfuu-6xFPlXYyF9375leuZigdv34rzl9I",
      authDomain: "first-1a766.firebaseapp.com",
      databaseURL: "https://first-1a766.firebaseio.com",
      storageBucket: "first-1a766.appspot.com",
      messagingSenderId: "217889589798"
  }

})
.config(function($routeProvider){

  $routeProvider
  .when("/" , {
    templateUrl: "assets/templates/login.html",
    controller: "LoginCtrl"
  })
  .when('/messages', {
      templateUrl:"assets/templates/messages.html",
      controller: "MessageCtrl"
  });
})
.filter("reverse" , function(){
  return function(items){
    if(!items) return;
    return items.slice().reverse();
  }
});
