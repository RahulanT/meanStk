angular.module('stkMainModule')

.factory('TradeService', function ( $http , DataService , TickerService) {

    var service = {};
  
    service.buyShare = buyShare;
  
    return service;
  
  
  
    function buyShare( UserID , ticker , company , noStocks , bsPrice , currPrice ) {
  
        $http.post('./Login-Auth/transacts' , { UserID , ticker , company , noStocks , bsPrice , currPrice } )
  
            .then((userData) => {
  
                console.log("User Data: ", userData);
  
  
            });
  
    }
  
  });
  