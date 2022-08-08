

angular.module('stkMainModule')

.controller( "myAccountCtrl",    function ( $scope , $http , $rootScope , $log ) {

    $scope.myAccountView = {};

    $scope.tradePanel = false ; 

    $scope.rsData = $rootScope.currentUser;

    console.log('Root Scope User:' , $scope.rsData);

    $http.get( './Login-Auth/me' ,  $scope.rsData.token )

    .then( (userData) => {

        console.log("User Data: ", userData);

        $scope.myAccountView = userData;


    } );


    $scope.sellHandleFunc = function ( passedTradeID ) {

        console.log("Passed Trade ID: " , passedTradeID);

        $scope.tradePanel = $scope.tradePanel ? false : true;

        // $http.post( './Login-Auth/transacts/sell' ,   { token: $scope.rsData.token , tradeID: passedTradeID } )

        // .then((result)=>{

        //     console.log(result);

        // })
    }

});
