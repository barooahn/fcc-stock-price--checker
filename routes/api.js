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
      let result = [];
        //console.log(req.query);
      if(req.query.stock) {
        const stock = req.query.stock
        //console.log(stock1);
        let loops = 1;
        if (typeof stock == 'object' ){loops = 2} 
        for (let i = 0; i < loops; i ++){ 
          const stock_url = 'https://api.iextrading.com/1.0/stock/'+ stock[i] + '/book';

          fetch(stock_url)
          .then(function(response) {
            return response.json();
          })
          .then(function(price) {
            result.push({"stock":stock[i],"price":price.quote.latestPrice,"rel_likes":1});
          });
        }
      }
      console.log(result);
      res.json(result);
  });
  
  
  //fetch();
    
};
