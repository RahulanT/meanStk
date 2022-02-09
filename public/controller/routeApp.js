angular.module('stkMainModule')

    .config ( ['$routeProvider',
        
        function config( $routeProvider ) {

       $routeProvider

            .when("/", {
              templateUrl : "./htmlPages/index.html"
              // controller : "view4Ctrl"

            })
            .when("/Search", {
            templateUrl : "./htmlPages/searchComponent.html",
            controller : "searchCtrl"

            })
            .when("/StockScreener", {
            templateUrl : "./htmlPages/stock_screener_2.0.html",
            controller : "screenerCtrl"

            })
            .when("/LearnAboutStocks", {
            templateUrl : "./htmlPages/allAboutStocks.html",
            //   controller : "view2Ctrl"

            })
            .when("/Portfolio" , {
            templateUrl : "./htmlPages/loginModal.html",
            controller : "login2Ctrl"

            })
            .when("/PlotView", {
            templateUrl : "./htmlPages/fetchingtest_2.0.html"
            // controller : "view4Ctrl"

            })
            .when("/TickerView", {
            templateUrl : "./htmlPages/individualStockView.html",
            controller : "indStkViewCtrl"

            })
            .when("/my-account-details", {
            templateUrl : "./htmlPages/portfolioPage.html",
            controller : "myAccountCtrl"
            });

            
        }]);


