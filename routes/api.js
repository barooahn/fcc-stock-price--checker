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
        if (typeof stock == 'object' ){loops = 2} 
        for (let i = 0; i < loops; i ++){ 
         
        result[i] = fetch('https://api.iextrading.com/1.0/stock/'+ stock[i] + '/book')
              .then((response)=>response.json())
              .then((price)=>{return {"stock":stock[i],"price":price.quote.latestPrice,"rel_likes":1}});
        
        }
      res.json(result);
      }


  
  });
  
  
  //fetch();
  
    
};
