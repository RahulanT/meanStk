angular.module('stkMainModule')

.factory('DataService', function ($rootScope) {

    var service = {};

    $rootScope.currentUser = {};

    service.saveUser = saveUser;
    service.getUserToken = getUserToken;


    function saveUser(data) {
      $rootScope.currentUser = data;
    };

    function getUserToken() {
      return $rootScope.currentUser.token;
    };

    return service;


 });  