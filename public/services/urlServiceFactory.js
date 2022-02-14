angular.module('stkMainModule')

.factory('urlService', function ( $http , DataService ) {


    var service = {};
  
    service.urlServFunc = urlServFunc ;
  
    return service;
  
    async function urlServFunc(parameters) {
        
          let urlDict = [

                         "https://financialmodelingprep.com/api/v3/sectors-performance?apikey=ee74a2831784bf661aeeeefb557a43cd",  
                         "https://financialmodelingprep.com/api/v3/stock_news?limit=50&apikey=ee74a2831784bf661aeeeefb557a43cd",
                         "https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=ee74a2831784bf661aeeeefb557a43cd"
          ];
          /// Fetch api link-2 Company Profile
        
        let reqUrls = [];
        
        parameters.forEach ( element => { reqUrls.push( "https://financialmodelingprep.com/api/v3/quote/" + element  +  "?apikey=ee74a2831784bf661aeeeefb557a43cd") } );
        
        urlDict.forEach((element) =>{reqUrls.push(element)});

        console.log(reqUrls);

        let requests = reqUrls.map(url => fetch(url).then(responses => responses.json()));
            
        return Promise.all(requests)
    
            .then( function (data) {

                console.log(data);
    
                    return data;
            });
        }
          
   });