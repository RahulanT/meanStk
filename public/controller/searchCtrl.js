angular.module('stkMainModule')

.controller ("searchCtrl" ,  function ($scope , $log , $http , $window , TickerService , $route) {

    $scope.tickerSearchBox = '';

    $scope.tickSelected = '';
  
    $scope.updatedList = [];
  
    $log.log($scope.tickerSearchBox);
    
  
  
    $scope.updateSearchFunc =  async function () {
  
      $log.log($scope.tickerSearchBox);
  
      return await TickerService.searchTicker( $scope.tickerSearchBox )
  
      .then( function(data) {
  
        // $log.log(data);
        
        for( let i = 0 ; i < data.length ; i++){
  
          $scope.updatedList.push({'symbol' : data[i]['symbol'] , 'CompanyName' : data[i]['name']});
          $scope.$apply();
  
        }
  
        // return $scope.updatedList;
      })
  
  
    }

    $scope.routeUserSearch = function() {

      var landingUrl = "http://" + $window.location.host + "/#!/TickerView/" + $scope.tickSelected ;
                  
      $log.log(landingUrl);

      $window.location.href = landingUrl;


      return null;

    }
  
    
  });