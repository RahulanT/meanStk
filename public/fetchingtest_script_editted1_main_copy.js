



function senddata() {

    function findmaxdate ( sampdic ) {

      var maxdate = 0;
      var maxdateindex;

        sampdic["datasets"].forEach( (item , index) => {

            if (sampdic['datasets'][index]['data'].length > maxdate ) { 
              maxdate = sampdic['datasets'][index]['data'].length;
              maxdateindex = index;
              }
           
            return;
            
          });


        console.log(maxdateindex);
        console.log('The largest dataset is' , sampdic['datasets'][maxdateindex]['label']);
        return maxdateindex;
    };


  /* TICKER INPUT SPLITTER */
    const colorarray= ['black','blue','green','red','orange'];
    let urls= [];
    var str1= document.getElementById('tickerID_1').value;
    var ticker_split = str1.split(',');
    const fmpKey = '?serietype=line&apikey=ee74a2831784bf661aeeeefb557a43cd';

    /* SETTING THE URLS ARRAY -- Output is an array of urls to be fetched */
    ticker_split.forEach( function(tic){

      let url_new = 'https://financialmodelingprep.com/api/v3/historical-price-full/' + tic + fmpKey ;
      urls.push(url_new);

    });

    console.log('The tickers selected:' , ticker_split);

    /* SENDING ALL THE REQUESTS FOR EACH STOCK TICKER*/
    let requests = urls.map(url => fetch(url).then(responses => responses.json()));

    console.log('Response from the API:' , requests);

    var samp_dic= {};
    var dataset=[];

    return Promise.all(requests)

        .then( function(data) {

          // var samp_dic= {};
          // var dataset=[];


          /* For each row in the returned dataset */

          data.forEach ( function(d) {

            let randomcolor = colorarray[Math.floor(Math.random()*colorarray.length)];
            let value_arr=[];
            let date_arr= [];
            let symbol_var = d['symbol'].toString();
            let dataset_obj= { label: null, borderColor: randomcolor , data: 0 , date: 0 };





            /* List all the keys in the dataset*/
            console.log(symbol_var);

            console.log('These are the keys ' + Object.keys(d));

            //*A NEW DATASET_OBJ IS CREATED*//
            dataset_obj['label'] = symbol_var ;

            //THE HISTORICAL DATES AND CLOSING PRICES ARE ADDED TO AN ARRAY AND ADDED TO DATASET_OBJ//
            for (i=0; i < Object.keys(d["historical"]).length ; i++) {

              date_arr[i]= d["historical"][i]["date"];

              value_arr[i]= d["historical"][i]["close"];

            }


            dataset_obj["date"] = date_arr.length;
            dataset_obj["data"] = value_arr.reverse();

            //****NEW DATASET_OBJ IS PUSHED INTO THE DATASET ARRAY****//
            //***THE NEW DATASET_OBJ IS ESSENTIALLY A NEW TICKER****//
            dataset.push(dataset_obj);
        });
        // FOR LLOP EACH ENDS HERE ^^^^^^^^^^^^ //

        samp_dic["datasets"] = dataset;
        samp_dic["labels"] = [] ;
        console.log('Today' , samp_dic);
        //****** THIS FUNCTION IS TO FIND THE SYMBOL WITH THE LARGEST DATE COLLECTION ****////

        maxdateindex = findmaxdate(samp_dic);

        console.log('the max date index', maxdateindex);
        /// THE MAXDATEINDEX IS USED TO CREATE THE LABELS FOR THE GRAPH//
        data[maxdateindex]['historical'].forEach( (item, i) => {

          samp_dic["labels"].push(data[maxdateindex]['historical'][i]['date']);

        } );

        samp_dic["labels"] = samp_dic["labels"].reverse();


        // THIS FILLS THE DATASET-OBJS OR TICKERS WITH ZERO VALUES SO THAT THE LABELS ARE ALIGNED///
        for (let i = 0; i < Object.keys(samp_dic['datasets']).length; i++) {

          if (i === maxdateindex){
              console.log('maxdatindex skipped');
              continue;
            }

            let extendby = samp_dic["datasets"][maxdateindex]['data'].length - samp_dic["datasets"][i]['data'].length;
            temp_array = new Array(extendby).fill(0);
            samp_dic["datasets"][i]['data'] =  temp_array.concat(samp_dic["datasets"][i]['data']);

        };

        console.log(samp_dic);




        return samp_dic;
      });

  }

// function findmaxdate(sampdic){
//
//     let maxdate = 0;
//     let maxdateindex;
//
//       sampdic["datasets"].forEach((item,index) => {
//
//           if (sampdic['datasets'][index]['data'].length < maxdate ) { return;}
//             maxdate = sampdic['datasets'][index]['data'].length;
//             maxdateindex= index;
//
//
//         });
//
//
//       console.log(maxdateindex);
//        console.log('The largest dataset is' , sampdic['datasets'][maxdateindex]['label']);
//       return maxdateindex;
//       };


function recievedata () {


    senddata().then( (data) => {

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

//
//   function news_stock(){
//
//     var str1= document.getElementById('tickerID_1').value;
//
//     var url = "https://financialmodelingprep.com/api/v3/stock_news?tickers=" + str1 + "&limit=50&apikey=ee74a2831784bf661aeeeefb557a43cd"
//
//     return fetch(url)
//
//     .then(responses => responses.json())
//       .then((data)=> {
//           var dataTable = [];
//           console.log(data[1]['text']);
//           var newselement = document.getElementById("stocknews");
//
//         //   newselement.querySelector("h").innerHTML = data[0]['symbol']
//
//           newselement.querySelector("p").innerHTML = data[0]['text']
//
//
// })
// }
