angular.module('stkMainModule')

.factory('TickerService', function ( $http , DataService ) {


    var service = {};
  
    service.mainServFunc = mainServFunc ;
  
    return service;
  
    async function mainServFunc(ticker , parameters) {
        
        const parameterEnum = [
            'profile',
            'histPrice',
            'news',
            'peers',
            'shortQuote'
        ];

          ticker = ticker.toUpperCase();
      
          parameters.forEach( element => {
              
              if ( !parameterEnum.includes(element) ) return err;
      
      
          });
        
          let urlDict = { profile : 'https://financialmodelingprep.com/api/v3/company/profile/' + ticker + '?apikey=ee74a2831784bf661aeeeefb557a43cd' ,
                          histPrice : 'https://financialmodelingprep.com/api/v3/historical-price-full/' + ticker + '?apikey=ee74a2831784bf661aeeeefb557a43cd' ,
                          news: "https://financialmodelingprep.com/api/v3/stock_news?tickers=" + ticker + "&limit=50&apikey=ee74a2831784bf661aeeeefb557a43cd" ,
                          peers : "https://financialmodelingprep.com/api/v4/stock_peers?symbol=" + ticker + "&apikey=ee74a2831784bf661aeeeefb557a43cd",
                          shortQuote : 'https://financialmodelingprep.com/api/v3/quote-short/' + ticker + '?apikey=ee74a2831784bf661aeeeefb557a43cd'
                          };
          /// Fetch api link-2 Company Profile
          let reqUrls = [];

          parameters.forEach(element => { reqUrls.push( urlDict[element] ) } );

          let requests = reqUrls.map(url => fetch(url).then(responses => responses.json()));
      
      
      
          return Promise.all(requests)
      
              .then( function (data) {

                    console.log(data);
      
                      return data;
              });
          }
          
   });