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
          const stock1 = stock[0].toUpperCase();
          const stock2 = stock[1].toUpperCase();
            fetch('https://api.iextrading.com/1.0/stock/market/batch?symbols='+stock1+','+stock2+'&types=quote')
                .then(res => res.json())
                .then(data => {
                  result = [{"stock":stock1,"price":data[stock1].quote.latestPrice,"rel_likes":1},
                     {"stock":stock2,"price":data[stock2].quote.latestPrice,"rel_likes":1}];
                  res.json(result) 
                });  
        } else {
          fetch('https://api.iextrading.com/1.0/stock/'+ stock + '/book')  
          .then(res => res.json())
                .then(data => {
                  result = [{"stock":stock1,"price":data[stock1].quote.latestPrice,"rel_likes":1},
                     {"stock":stock2,"price":data[stock2].quote.latestPrice,"rel_likes":1}];
                  res.json(result) 
                });  
        }
          
   
     
      }


  
  });
  
  
  //fetch();
  
    
};
