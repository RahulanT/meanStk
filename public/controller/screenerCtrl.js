angular.module('stkMainModule')

.controller('screenerCtrl', ['$scope' , '$http' , function($scope, $http , $log) {

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