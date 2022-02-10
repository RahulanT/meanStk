angular.module('stkMainModule')

.controller( "login2Ctrl"  ,  function ($scope , $http , $location, $window , $rootScope , AuthService , DataService ) {

    // $rootScope.loggedInUser = {};
    $scope.user = {};
    $scope.user.email = 'null' ;
    $scope.user.password = 'null';


    $scope.handleForm =  async function () {

          console.log('handleForm() called');

          return await AuthService.Login( $scope.user.email , $scope.user.password )
          
          .then( function (responseBool) {

              let authenticatingState = document.getElementById('authSpin');

              authenticatingState.style.display = "block";
              
              document.getElementById('authForm').style.display = "none";


              console.log('front page response:' , responseBool);

              if (responseBool){

                  $('#loginModal').modal('hide');
                  $('.modal-backdrop').remove()

                  // $location.url('/my-account-details');

                  var landingUrl = "http://" + $window.location.host + "/#!/my-account-details";
                  
                  $window.location.href = landingUrl;

              }
              else{
                  
                  document.getElementById('authForm').style.display = "block";

                  return null;

              }

          });

          return null;
    };





  });