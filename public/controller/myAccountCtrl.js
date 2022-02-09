angular.module('stkMainModule')

.controller( "myAccountCtrl",    function ( $scope , $http , $rootScope ) {

    $scope.myAccountView = {};

    $scope.rsData = $rootScope.currentUser;

    console.log('Root Scope User:' , $scope.rsData);

    $http.get('./Login-Auth/me' ,  $scope.rsData.token )

    .then((userData) => {

        console.log("User Data: ", userData);

        $scope.myAccountView = userData;


    });

});
