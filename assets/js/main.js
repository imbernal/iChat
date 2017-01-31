var config = {
    apiKey: "AIzaSyCfuu-6xFPlXYyF9375leuZigdv34rzl9I",
    authDomain: "first-1a766.firebaseapp.com",
    databaseURL: "https://first-1a766.firebaseio.com",
    storageBucket: "first-1a766.appspot.com",
    messagingSenderId: "217889589798"
  };

firebase.initializeApp(config);

var db = firebase.database();
var messageRef = db.ref("messages/");

var provider = new firebase.auth.FacebookAuthProvider();

function save(){
  var messageId = messageRef.push({
    user: "id yet lol",
    message: $("#message-input").val()
  });
};


function as(){
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(JSON.parse(errorMessage));
  });
}


// firebase.auth().signInWithPopup(provider).then(function(result) {
//
//   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//   var token = result.credential.accessToken;
//
//   // The signed-in user info.
//   var user = result.user;
//
//   console.log(user);
//
//   messageRef.on('value' , function(snapshot){
//     var values = snapshot.val();
//     $('#messages').html("");
//     for (var item in values){
//       var msg = values[item];
//       $('#messages').append(`<li>${msg.user}: ${msg.message}</li>`);
//     }
//   })
//
//   // ...
// }).catch(function(error) {
//   console.log(error);
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });
