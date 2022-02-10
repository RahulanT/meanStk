// var {getStock} = require('./apiWBPG');

// const { Result } = require("express-validator");

var app = angular.module('stkMainModule' , ['ngRoute','ngMaterial'] );

// app.controller('firstController' , function () { 

// });

app.config ( function ( $routeProvider) {

    $routeProvider

    .when("/", {
      templateUrl : "index.html"
      // controller : "view4Ctrl"

    })
    .when("/search", {
      templateUrl : "searchComponent.html",
      controller : "searchCtrl"

    })
    .when("/StockScreener", {
      templateUrl : "stock_screener_2.0.html",
      controller : "stockCtrl"

    })
    .when("/LearnAboutStocks", {
      templateUrl : "allAboutStocks.html",
      controller : "view2Ctrl"

    })
    .when("/Portfolio" , {
      templateUrl : "loginModal.html",
      controller : "view6Ctrl"

    })
    .when("/view4", {
      templateUrl : "view4.htm",
      controller : "view4Ctrl"

    })
    .when("/PlotView", {
      templateUrl : "fetchingtest_2.0.html"
      // controller : "view4Ctrl"

    })
    .when("/tickerView", {
      templateUrl : "individualStockView.html",
      controller : "indStkViewCtrl"

    })
    .when("/my-account-details", {
      templateUrl : "portfolioPage.html",
      controller : "myAccountCtrl"
    });
  });

  app.controller('authController', function ($scope, $location, session) {
     
    // intercept the route change event
    $scope.$on('$routeChangeStart', function (angularEvent, newUrl) {
        
        // check if the custom property exist
        if (newUrl.requireAuth) {
            
            // user isn’t authenticated
            $location.path("/Portfolio");
        }
    });
});

  app.controller("view1Ctrl", function ($scope , $routeProvider) {
    $scope.msg = "I am View 1 Ctrl";
  });
  app.controller("view2Ctrl", function ($scope) {
    // $scope.msg = "I am View 2 Ctrl";
  });
  app.controller("view5Ctrl", function ($scope) {
    // $scope.msg = "I am View 2 Ctrl";
  });
  app.controller("view3Ctrl",  function ($scope , $http , $location , $rootScope ) {

      $rootScope.loggedInUser = {};
      $scope.user = {};
      $scope.user.email = 'null' ;
      $scope.user.password = 'null';


      $scope.handleForm =   function () {

            console.log('handleForm() called');

             $http.post('./Login-Auth/UserLogin', $scope.user )
             
              .then( function (response) {

                let authenticatingState = document.getElementById('authSpin');

                authenticatingState.style.display = "block";
                
                document.getElementById('authForm').style.display = "none";


                console.log('front page response:' , response);

                if (response['data']['userAuthResp']) {

                    $rootScope.loggedInUser.loginToken = response['data']['token'];

                    return $location.path('my-account-details');

                }
                else{
                    
                    document.getElementById('authForm').style.display = block;

                    return null;

                }

            });

            return null;
      }
    });
 

  app.controller('stockCtrl', ['$scope' , '$http' , function($scope, $http , $log) {

    // mrktCap_arr : { '$50 million to $300 million' : {'marketCapLowerThan' : 50000000 , 'marketCapMoreThan' : 300000000} , '$300 million to $2 billion' : {'marketCapLowerThan' : 300000000 , 'marketCapMoreThan' : 2000000000},'$2 billion to $10 billion': {'marketCapLowerThan' : 2000000000 , 'marketCapMoreThan' : 10000000000},'$10 billion to $200 billion' : {'marketCapLowerThan' : 10000000000 , 'marketCapMoreThan' : 200000000000} ,'More than $200 billion' : {'marketCapLowerThan' : 200000000000 } },
    // $scope.screener_return = [];


    $scope.formdata= {

      'sector_arr' : ['Basic Materials' , 'Communication', 'Consumer Cyclical' , 'Energy' , 'Technology' , 'Industrials'  , 'Consumer Defensive' , 'Healthcare' , 'Real Estate' , 'Utilities' , 'Industrial Goods' , 'Financial Services' , 'Conglomerates' ],  
      'exchange_arr' : [ 'nyse' , 'nasdaq' , 'amex' , 'euronext' , 'tsx' , 'etf' , 'mutual_fund'],
      'mrktCap_arr' : [ '$50 million to $300 million' , '$300 million to $2 billion','$2 billion to $10 billion','$10 billion to $200 billion' ,'More than $200 billion'],
      'mrktCap_dict' : [{'marketCapLowerThan' : 300000000 , 'marketCapMoreThan' :50000000 } ,  {'marketCapLowerThan' :2000000000 , 'marketCapMoreThan' : 300000000},  {'marketCapLowerThan' : 2000000000 , 'marketCapMoreThan' : 10000000000},  {'marketCapLowerThan' : 10000000000 , 'marketCapMoreThan' : 200000000000} , {'marketCapLowerThan' : 200000000000 } ],
      'mrktCap_index' : 0,
      'status' : false
  
      };
   
    $scope.constraints =  { 

      sector : '' , 
      exchange: '',
      marketCapMoreThan : $scope.formdata.mrktCap_dict[$scope.formdata.mrktCap_index]['marketCapMoreThan'],
      marketCapLowerThan : $scope.formdata.mrktCap_dict[$scope.formdata.mrktCap_index]['marketCapLowerThan'],
      priceLowerThan : 500,
      priceMoreThan : 0

      }; 


    $scope.colum = 'symbol';
    $scope.reverse = false; 
    $scope.sortColumn = function(col){

        $scope.column = col;
        
        if($scope.reverse){
            $scope.reverse = false;
            $scope.reverseclass = 'arrow-up';
        } else{
            $scope.reverse = true;
            $scope.reverseclass = 'arrow-down';
        }
    };

    $scope.screener_return = [];   

    $scope.passform = async function () {

        var loadingState = document.getElementById('loader');

        loadingState.style.display = "block";

        var screenerQueryString = "";
      

        Object.keys($scope.constraints).forEach( function(element) {

            if (typeof $scope.constraints[element] === 'undefined' || $scope.constraints[element] == '') return;

            console.log(element);

            screenerQueryString = screenerQueryString + element + '=' + $scope.constraints[element] + '&';

        });





        screenerQueryString ="https://financialmodelingprep.com/api/v3/stock-screener?" +  screenerQueryString  + "limit=100&apikey=ee74a2831784bf661aeeeefb557a43cd" ;
          
        console.log(screenerQueryString)

        // var request = {
        //   method: 'get',
        //   url: screenerQueryString,
        //   dataType: 'json',
        //   contentType: "application/json"
        // };

        await $http({
          method: 'GET',
          url: screenerQueryString
        })
        .then((data)=>{

          $scope.screener_return = data.data;
          loadingState.style.display = "none";
          $scope.formdata.status = true;

        })
    };

  }]); 

  

app.controller ("searchCtrl" ,  function ($scope , $log , $http) {

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




app.controller( "indStkViewCtrl", ['$scope',  function ($scope) {

    $scope.ticker = 'MSFT';
   
    $scope.pageValues = {};

    $scope.finalPlot = {};

    $scope.newsArray =[];

    $scope.newsArray =[];

    $scope.peersArray =[];


     getStock($scope.ticker)

      .then( (dataDict) => {

              tickDict = dataDict[0];
              plotDict = dataDict[1];
              newsDict = dataDict[2];
              peersDict = dataDict[3];

              console.log(newsDict);

              $scope.pageValues = {

                companyName : tickDict['profile']["companyName"],

                mktCap : tickDict['profile']["mktCap"],

                price : tickDict['profile']["price"],

                beta : tickDict['profile']["beta"],

                volAvg : tickDict['profile']["volAvg"],

                exchangeShortName : tickDict['profile']["exchangeShortName"],

                sector : tickDict['profile']["sector"],

                image : tickDict['profile']["image"],
                
                description : tickDict['profile']["description"],

                website : tickDict['profile']["website"],

                symbol : tickDict["symbol"],

              };

              peersDict.forEach( (item , index) => {

                $scope.peersArray.push({
  
                  title : item['title'],
                  image : item['image'],
                  text : item['text'],
  
                 });
  
                });

             newsDict.forEach((item , index) =>{

              $scope.newsArray.push({

                title : item['title'],
                image : item['image'],
                text : item['text'],

               });

              });
                // title = newsDict['title'],
                // title = newsDict['title'],

              $scope.$apply();
              document.getElementById("stockPic").src = tickDict['profile']['image'];

              
            
              let value_arr=[];
              let date_arr= [];               
              let finalPlot = {};
              //*A NEW DATASET_OBJ IS CREATED*//
              // dataset_obj['label'] = symbol_var ;
  
              //THE HISTORICAL DATES AND CLOSING PRICES ARE ADDED TO AN ARRAY AND ADDED TO DATASET_OBJ//
              for (i=0; i < Object.keys(plotDict["historical"]).length ; i++) {
  
                date_arr[i]= plotDict["historical"][i]["date"];
  
                value_arr[i]= plotDict["historical"][i]["close"];
  
              }
  
  
              finalPlot["date"] = date_arr.reverse();
              finalPlot["data"] = value_arr.reverse();
  
              //****NEW DATASET_OBJ IS PUSHED INTO THE DATASET ARRAY****//
              //***THE NEW DATASET_OBJ IS ESSENTIALLY A NEW TICKER****//
             
              var data = [
                {
                  x: finalPlot['date'],
                  y: finalPlot['data'],
                  type: 'scatter'
                }
              ];

              var layout = { paper_bgcolor: '#c2c2c7' , plot_bgcolor: '#c2c2c7' , margin:{l:40 , b:40, r: 50 , t: 20 , pad: 0} };

              
              Plotly.newPlot('stkPlotDiv', data , layout);




          });
    
    






  }]);


app.factory('DataService', function ($rootScope) {

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

 app.factory('TickerService', function ( $http , DataService) {

  var service = {};

  service.mainServFunc = mainServFunc ;

  return service;

  async function mainServFunc(ticker){

      return await getStock2p0( ticker , [ shortQuote ])

      .then( (data)=>{

        return data.price;

      })

  }


 });




app.factory('AuthService', Service);

function Service( $http , DataService) {

  var service = {};

  service.Login = Login;
  service.Logout = Logout;

  return service;

  async function Login(email, password) {

      console.log("Auth Service Accessed " , email , password);

      return await $http.post('./Login-Auth/UserLogin', {  email ,  password } )

          .then( function (response) {

              console.log('response:', response);
              // login successful if there's a token in the response
              if (response.status === 200) {
                  // store username and token in local storage to keep user logged in between page refreshes
                  DataService.saveUser({ email: email, token: response.data.token });

                  // add jwt token to auth header for all requests made by the $http service
                  // $http.defaults.headers.common.Authorization = 'Bearer' + response.token;
                  $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;

                  // execute callback with true to indicate successful login
                  return true;

              } else {

                  // execute callback with false to indicate failed login
                  return false;

              }

          });
  }

  function Logout() {
      // remove user from local storage and clear http auth header
      delete $rootScope.currentUser;
      $http.defaults.headers.common.Authorization = '';
  }

}





app.controller("view6Ctrl",  function ($scope , $http , $location, $window , $rootScope , AuthService , DataService ) {

      // $rootScope.loggedInUser = {};
      $scope.user = {};
      $scope.user.email = 'null' ;
      $scope.user.password = 'null';


      $scope.handleForm =  async function () {

            console.log('handleForm() called');

            return await AuthService.Login( $scope.user.email , $scope.user.password )
            
            .then( function (responseBool) {

                let authenticatingState = document.getElementById('authSpin');

                authenticatingState.style.display = "block";
                
                document.getElementById('authForm').style.display = "none";


                console.log('front page response:' , responseBool);

                if (responseBool){

                    $('#loginModal').modal('hide');
                    $('.modal-backdrop').remove()

                    // $location.url('/my-account-details');

                    var landingUrl = "http://" + $window.location.host + "/#!/my-account-details";
                    
                    $window.location.href = landingUrl;

                }
                else{
                    
                    document.getElementById('authForm').style.display = "block";

                    return null;

                }

            });

            return null;
      };





    });

app.controller( "myAccountCtrl",    function ( $scope , $http , $rootScope ) {

        $scope.myAccountView = {};

        $scope.rsData = $rootScope.currentUser;

        console.log('Root Scope User:' , $scope.rsData);

        $http.get('./Login-Auth/me' ,  $scope.rsData.token )

        .then((userData) => {

            console.log("User Data: ", userData);

            $scope.myAccountView = userData;


        });

})


app.factory('TradeService', function ( $http , DataService , TickerService) {

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



app.controller( "indStkViewCtrl", ['$scope',  function ($scope) {

  $scope.ticker = 'MSFT';
 
  $scope.pageValues = {};

  $scope.finalPlot = {};

  $scope.newsArray =[];

  $scope.newsArray =[];

  $scope.peersArray =[];


   getStock($scope.ticker)

    .then( (dataDict) => {

            tickDict = dataDict[0];
            plotDict = dataDict[1];
            newsDict = dataDict[2];
            peersDict = dataDict[3];

            console.log(newsDict);

            $scope.pageValues = {

              companyName : tickDict['profile']["companyName"],

              mktCap : tickDict['profile']["mktCap"],

              price : tickDict['profile']["price"],

              beta : tickDict['profile']["beta"],

              volAvg : tickDict['profile']["volAvg"],

              exchangeShortName : tickDict['profile']["exchangeShortName"],

              sector : tickDict['profile']["sector"],

              image : tickDict['profile']["image"],
              
              description : tickDict['profile']["description"],

              website : tickDict['profile']["website"],

              symbol : tickDict["symbol"],

            };

            peersDict.forEach( (item , index) => {

              $scope.peersArray.push({

                title : item['title'],
                image : item['image'],
                text : item['text'],

               });

              });

           newsDict.forEach((item , index) =>{

            $scope.newsArray.push({

              title : item['title'],
              image : item['image'],
              text : item['text'],

             });

            });
              // title = newsDict['title'],
              // title = newsDict['title'],

            $scope.$apply();
            document.getElementById("stockPic").src = tickDict['profile']['image'];

            
          
            let value_arr=[];
            let date_arr= [];               
            let finalPlot = {};
            //*A NEW DATASET_OBJ IS CREATED*//
            // dataset_obj['label'] = symbol_var ;

            //THE HISTORICAL DATES AND CLOSING PRICES ARE ADDED TO AN ARRAY AND ADDED TO DATASET_OBJ//
            for (i=0; i < Object.keys(plotDict["historical"]).length ; i++) {

              date_arr[i]= plotDict["historical"][i]["date"];

              value_arr[i]= plotDict["historical"][i]["close"];

            }


            finalPlot["date"] = date_arr.reverse();
            finalPlot["data"] = value_arr.reverse();

            //****NEW DATASET_OBJ IS PUSHED INTO THE DATASET ARRAY****//
            //***THE NEW DATASET_OBJ IS ESSENTIALLY A NEW TICKER****//
           
            var data = [
              {
                x: finalPlot['date'],
                y: finalPlot['data'],
                type: 'scatter'
              }
            ];

            var layout = { paper_bgcolor: '#c2c2c7' , plot_bgcolor: '#c2c2c7' , margin:{l:40 , b:40, r: 50 , t: 20 , pad: 0} };

            
            Plotly.newPlot('stkPlotDiv', data , layout);




        });
  
  






}]);