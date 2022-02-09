angular.module('stkMainModule')

.factory('AuthService', function ( $http , DataService) {

  var service = {};

  service.Login = Login;
  service.Logout = Logout;

  return service;

  async function Login(email, password) {

      console.log("Auth Service Accessed " , email , password);

      return await $http.post('./Login-Auth/UserLogin', {  email ,  password } )

          .then( function (response) {

              console.log('response:', response);
              // login successful if there's a token in the response
              if (response.status === 200) {
                  // store username and token in local storage to keep user logged in between page refreshes
                  DataService.saveUser({ email: email, token: response.data.token });

                  // add jwt token to auth header for all requests made by the $http service
                  // $http.defaults.headers.common.Authorization = 'Bearer' + response.token;
                  $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;

                  // execute callback with true to indicate successful login
                  return true;

              } else {

                  // execute callback with false to indicate failed login
                  return false;

              }

          });
  }

  function Logout() {
      // remove user from local storage and clear http auth header
      delete $rootScope.currentUser;
      $http.defaults.headers.common.Authorization = '';
  }

});