app.controller("loginCtrl",  function ($scope , $http , $location , $rootScope ) {

    $rootScope.loggedInUser = {};
    $scope.user = {};
    $scope.user.email = 'null' ;
    $scope.user.password = 'null';


    $scope.handleForm =   function () {

          console.log('handleForm() called');

           $http.post('./Login-Auth/UserLogin', $scope.user )
           
            .then( function (response) {

              let authenticatingState = document.getElementById('authSpin');

              authenticatingState.style.display = "block";
              
              document.getElementById('authForm').style.display = "none";


              console.log('front page response:' , response);

              if (response['data']['userAuthResp']) {

                  $rootScope.loggedInUser.loginToken = response['data']['token'];

                  return $location.path('my-account-details');

              }
              else{
                  
                  document.getElementById('authForm').style.display = block;

                  return null;

              }

          });

          return null;
    }
  });