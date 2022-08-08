angular.module('stkMainModule')

.controller( "cmprPlotCtrl" , ['$scope', '$log' , 'PlotCompareService' , 'TickerService' ,  function ( $scope, $log  , PlotCompareService , TickerService ) {

     $scope.tickers = '';

    // var tickerData = await TickerService.mainServFuncExtended ( $scope.tickers ) ; 

    $scope.plotTickers =  async function () {

        console.log("plottickers pressed");

        var tickerData =  await TickerService.mainServFuncExtended ( $scope.tickers );

        return await PlotCompareService.SortData(tickerData)

            .then( (data) => {

                var arraydata = data;
        
        
                arraydata['datasets'].forEach( (item, i) => {
        
                delete arraydata['datasets'][i]['date'];
        
                });
        
                var ctx = document.getElementById('myChart_2').getContext('2d');
        
                var chart = new Chart( ctx , {
                    // The type of chart we want to create
                    type: 'line',
        
                    // The data for our dataset
                    data: arraydata,
                    options: {
                        scales: {
                        xAxes: [{
                            // type: 'linear',
                            // position: 'bottom',
                            ticks: {
                            stepSize: 370,                  
                            },
                            gridLines: {
                            color: 'rgba(171,171,171,1)',
                            lineWidth: 1
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                            color: 'rgba(171,171,171,1)',
                            lineWidth: 0.5
                            }
                        }]
                        },
                    }
        
                });
            });
            
    }
  }]);

  