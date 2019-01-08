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

const project = stocks;

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
      console.log(req.query);
    
      if(req.query.like) {
        //get ip of user
        const userIp = req.connection.remoteAddress
        //check database for ip
        
        MongoClient.connect(CONNECTION_STRING, function(err, db) {
            const collection = db.collection(project);
            db.collection.findAndModify({
              query: { ip: userIp },
              update: {
                $setOnInsert: { ip: userIp,  }
              },
              new: true,   // return new doc if one is upserted
              upsert: true // insert the document if it does not exist
            })
        });
        
        //if there update stock liked
        //if not add stock to db under ip address
        
        //query database for stock and return number of results
      }
    
    
    
      if(req.query.stock) {
        let result =[];
        let stock = req.query.stock
        let loops = 1;
        if (typeof stock == 'object' ){
          const stock1 = stock[0].toUpperCase();
          const stock2 = stock[1].toUpperCase();
          fetch('https://api.iextrading.com/1.0/stock/market/batch?symbols='+stock1+','+stock2+'&types=quote')
            .then(res => res.json())
            .then(data => {
              result = {stockdata:[{"stock":stock1,"price":data[stock1].quote.latestPrice,"rel_likes":1},
                 {"stock":stock2,"price":data[stock2].quote.latestPrice,"rel_likes":1}]};
              res.json(result) 
            });  
        } else {
          stock = stock.toUpperCase();
          fetch('https://api.iextrading.com/1.0/stock/'+ stock + '/book')  
            .then(res => res.json())
            .then(data => {
              result = {stockdata:{"stock":stock, price:data.quote.latestPrice,"rel_likes":1}};
              res.json(result) 
            });  
        }
          
   
     
      }


  
  });
  
  
  //fetch();
  
    
};
