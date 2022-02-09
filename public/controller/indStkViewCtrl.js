angular.module('stkMainModule')

.controller( "indStkViewCtrl", ['$scope','TickerService',  function ($scope , TickerService ) {

    $scope.ticker = 'MSFT';
   
    $scope.pageValues = {};
  
    $scope.finalPlot = {};
  
    $scope.newsArray =[];
  
    $scope.newsArray =[];
  
    $scope.peersArray =[];
  
  
    TickerService.mainServFunc($scope.ticker , ['profile' , 'peers' , 'news' , 'histPrice'])
  
      .then( (dataDict) => {
  
              tickDict = dataDict[0];
              plotDict = dataDict[3];
              newsDict = dataDict[2];
              peersDict = dataDict[1][0]['peersList'];
  
              console.log(dataDict);
  
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