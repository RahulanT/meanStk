angular.module('stkMainModule')

.controller ("welcomePageCtrl" ,  function ($scope , $log , $http , urlService) {

        $scope.indices = ["^NYA","^GSPC" , "^DJI" , "^IXIC" ,  "^FTSE" , "^RUT"];

        $scope.indicesView = [];
        $scope.newsListingView = [];
        $scope.activeListingView = [];
        $scope.sectorListingView = [];

        return urlService.urlServFunc( $scope.indices )

            .then( (data)=>{

                data.slice(0,5).forEach((element) => $scope.indicesView.push(element));
                data['7'].forEach((element) => $scope.newsListingView.push(element));
                data['8'].forEach((element) => $scope.activeListingView.push(element));
                data['6'].forEach((element) => $scope.sectorListingView.push(element));

                $scope.$apply();

            } )
});