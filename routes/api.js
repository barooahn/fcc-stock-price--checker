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
      const stock1 = req.query.stock
      //console.log(stock1);
      if (stock1){console.log(typeof stock1)}
      
    
      const stock_url = 'https://api.iextrading.com/1.0/stock/'+ stock1 + '/book';

      fetch(stock_url)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        res.json(myJson.quote.latestPrice);
      });
    }
  });
  
  
  //fetch();
    
};
