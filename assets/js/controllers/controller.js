app.controller("LoginCtrl" , ["$scope","$window" , "servicesProvidders" , function($scope , $window ,servicesProvidders){

  $scope.loginFacebook = function(){

    servicesProvidders.loginFacebookProvider().then((res)=>{
      $window.location = "#/messages";
    });


  }
}]).controller("MessageCtrl" , [ "$scope", "$window" ,  "servicesProvidders" , "messagesServices",
function($scope, $window, servicesProvidders, messagesServices){

    $scope.logout = function(){
      servicesProvidders.logoutFacebook().then(res=>{
      $window.location = "#/";
      });
    }
    $scope.messages = [];
    messagesServices.getMessages().then(res=>{

      $scope.messages = res;

    });



    $scope.saveMessage = function(){
        var message = $('#textarea').val();
        messagesServices.saveMessage(message);
        $('#textarea').html("");
        messagesServices.getMessages().then(res=>{

          $scope.messages = res;

        });
    }
  //  $scope.user =  servicesProvidders.getUserByEmail(servicesProvidders.getCurrentUser().email);



}]);
