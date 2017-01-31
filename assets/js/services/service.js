app.factory("servicesProvidders" , [ "$http", "generalConfig" , function($http, generalConfig){

   var userData = null;

  firebase.initializeApp(generalConfig.config);

  var db = firebase.database();
  var userRef = db.ref("users/");
  var users = {};

  var provider = new firebase.auth.FacebookAuthProvider();

  function loginFacebookProvider(){

    return firebase.auth().signInWithPopup(provider).then(res=>{
      userData = res.user;
      userData.token = res.credential.accessToken;
      return getCurrentUser();
      return getUsers();



    });
  }



    function logoutFacebook(){
      return firebase.auth().signOut();
  }


  function saveUser(){

    userRef.push({
      name: userData.displayName,
      email: userData.email,
      photo: userData.photoURL

    });
  }

  function getUsers(){

     return userRef.once("value").then(res=>{

        if(res.val() ==null){

            saveUser();
        }else{
          Object.keys(res.val()).forEach(function(item){
              users[res.val()[item].email] = res.val()[item];
            });
        }
        return users;
    });
  }


  function getUserByEmail(){
    console.log(users);
    return users["imbernal9203@gmail.com"];
  }


  function getCurrentUser(){
    var user = firebase.auth().currentUser;

      if (user) {
        return user;
      } else {
        return null;
      }
  }


  return { loginFacebookProvider , logoutFacebook , getUserByEmail , getCurrentUser }

}])
.factory("messagesServices" , ["$http" ,"generalConfig","servicesProvidders" , function($http , generalConfig,servicesProvidders){


  var db = firebase.database();
  var messageRef = db.ref("messages/");


  function saveMessage(message){

    messageRef.push({

      userProfile: getUser(),
      hour:  new Date().getTime(),
      message: message

    });

  }


  function getMessages(){
    var messages = [];

     return new Promise(function(resolve,reject){
         messageRef.limitToLast(4).once("value").then(res=>{

              Object.keys(res.val()).forEach(function(item){
                console.log(res.val()[item]);
                  messages.push(res.val()[item]);
                });

            resolve(messages);
        });
     })
  }

  function getUser(){

    return servicesProvidders.getCurrentUser().photoURL;
  }

  return { getUser ,getMessages , saveMessage }


}]);
