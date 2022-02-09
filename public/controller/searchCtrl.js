angular.module('stkMainModule')

.controller ("searchCtrl" ,  function ($scope , $log , $http) {

    $scope.tickerSearchBox = '';
  
    $scope.updatedList = [];
  
    $log.log($scope.tickerSearchBox);
    
  
  
    $scope.updateSearchFunc =  async function () {
  
      $log.log($scope.tickerSearchBox);
  
      return await searchTicker( $scope.tickerSearchBox )
  
      .then( function(data) {
  
        // $log.log(data);
        
        for( let i = 0 ; i < data.length ; i++){
  
          $scope.updatedList.push({'symbol' : data[i]['symbol'] , 'CompanyName' : data[i]['name']});
          $scope.$apply();
  
        }
  
        // return $scope.updatedList;
      })
  
  
    }
  
    
  });