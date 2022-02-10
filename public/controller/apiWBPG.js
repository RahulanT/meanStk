const parameterEnum = Object.freeze({
    profile,
    histPrice,
    news,
    peers,
    shortQuote
  });



async function getStock (ticker) {

    ticker = ticker.toUpperCase();
  
    var api_link_2= 'https://financialmodelingprep.com/api/v3/company/profile/' + ticker + '?apikey=ee74a2831784bf661aeeeefb557a43cd'; //company profile
    var api_link_3= 'https://financialmodelingprep.com/api/v3/quote-short/' + ticker + '?apikey=ee74a2831784bf661aeeeefb557a43cd';
    var api_link_4= 'https://financialmodelingprep.com/api/v3/company-key-metrics/' + ticker // company key metrics
    var api_link_5= 'https://financialmodelingprep.com/api/v3/historical-price-full/' + ticker + '?apikey=ee74a2831784bf661aeeeefb557a43cd'
    var api_link_6 = "https://financialmodelingprep.com/api/v3/stock_news?tickers=" + ticker + "&limit=50&apikey=ee74a2831784bf661aeeeefb557a43cd"
    var api_link_7 = "https://financialmodelingprep.com/api/v4/stock_peers?symbol=AAPL&apikey=ee74a2831784bf661aeeeefb557a43cd"
    /// Fetch api link-2 Company Profile

    let urls= [api_link_2 , api_link_5 , api_link_6 , api_link_7];
    let requests = urls.map(url => fetch(url).then(responses => responses.json()));



    return Promise.all(requests)

        .then( function (data2) {

                return data2;
        });
}

 

searchTicker = async function (  userQuery  ) {

    let query =  String(userQuery).toUpperCase();

    let response = await fetch("https://financialmodelingprep.com/api/v3/search?query=" +  query + "&limit=10&exchange=NASDAQ&apikey=ee74a2831784bf661aeeeefb557a43cd")
    let result = await response.json();
    console.log(result);

    return result;
}


// function news_stock(){

//     var str1= document.getElementById('tickerID_1').value;

//     var url = "https://financialmodelingprep.com/api/v3/stock_news?tickers=" + str1 + "&limit=50&apikey=ee74a2831784bf661aeeeefb557a43cd"

//     return fetch(url)
 
//     .then(responses => responses.json())
//       .then((data)=> {
//           var dataTable = [];
//           console.log(data[0]['text']);
//           var newselement = document.getElementById("stocknews");

//         //   newselement.querySelector("h").innerHTML = data[0]['symbol']

//           newselement.querySelector("p").innerHTML = data[0]['text']


// })
// }


async function getStock2p0 (ticker , parameters) {

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
    parameters.forEach(element => { reqUrls.push(urlDict[element]) })
    let requests = reqUrls.map(url => fetch(url).then(responses => responses.json()));



    return Promise.all(requests)

        .then( function (data) {

                return data;
        });
        
}

const err = new Error("Invalid Parameter(s)!");
