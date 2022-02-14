

angular.module('stkMainModule')

.controller( "myAccountCtrl",    function ( $scope , $http , $rootScope , $log ) {

    $scope.myAccountView = {};

    $scope.rsData = $rootScope.currentUser;

    console.log('Root Scope User:' , $scope.rsData);

    $http.get( './Login-Auth/me' ,  $scope.rsData.token )

    .then( (userData) => {

        console.log("User Data: ", userData);

        $scope.myAccountView = userData;


    } );


    $scope.sellHandleFunc = function (passedTradeID) {

        $log.log(passedTradeID);


        $http.post( './Login-Auth/transacts/sell' ,   { token: $scope.rsData.token , tradeID: passedTradeID } )

        .then((result)=>{

            console.log(result);

        })
    }

});
