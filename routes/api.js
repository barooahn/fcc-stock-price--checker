/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
const fetch = require('node-fetch');

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
        //console.log(req.query);
      if(req.query.stock) {
        let result =[];
        const stock = req.query.stock
        //console.log(stock1);
        let loops = 1;
        if (typeof stock == 'object' ){
          const request = async () => {  
            const response =  await fetch('https://api.iextrading.com/1.0/stock/market/batch?symbols='+stock[0],stock[1]+'&types=quote')
            const data = await response.json();
            
            //result= {"stock":stock[i],"price":data.quote.latestPrice,"rel_likes":1}};

        }  
          loops = 2} 
//         for (let i = 0; i < loops; i ++){ 
//           console.log(stock)  
//           const request = async (stock) => {  
//             const response =  await fetch('https://api.iextrading.com/1.0/stock/'+ stock + '/book')
//             const data = await response.json();
//             result= {"stock":stock[i],"price":data.quote.latestPrice,"rel_likes":1}};

//         console.log('result', result);
//         //result[i] = request();
//           console.log('request', request());
        }
      res.json(result);
      }


  
//   });
  
  
  //fetch();
  
    
};
