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

const project = 'stocks';

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {
      
  //getlikes
    //find stock 
    //return count of results
 
  
  app.route('/api/stock-prices')
    .get(function (req, res){
    
    
     const getLikes = (stock) => {
        let result; 
        MongoClient.connect(CONNECTION_STRING, function(err, db) {
          const collection = db.collection(project);
          db.collection.find({
            query: { stock: stock },
            function(err,docs){
              if(err) throw(err)
              result = docs.count()
            }  
          });
          db.close();
          return result
        }); 
      }

      //addlike
      const addLike = (userIp, stock) => {
        //check database for userIp
        //if not there save userIp, stock
        //if there update stock

        MongoClient.connect(CONNECTION_STRING, function(err, db) {
          const collection = db.collection(project);
          db.collection.findAndModify({
            query: { userIp: userIp },
            update: {
              $setOnInsert: { stock: stock },
            },
            new: true,   // return new doc if one is upserted
            upsert: true}, // insert the document if it does not exist
            function(err,doc){
              if(err) throw(err)
            }  
          );
          db.close();
        });
      }
    
    
      console.log(req.query);
     
      if(req.query.stock) {
        let result;
        let likes;
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
            }).catch(function(response){
              alert("No valid response");
            });  
        } else {
          stock = stock.toUpperCase();
          if(req.query.like) {
            const userIp = req.connection.remoteAddress;
            const like = req.query.like;   
            console.log(userIp);
            this.addLike(userIp, stock);
            likes = this.getLikes(stock);
            console.log('likes',likes);
          }
          fetch('https://api.iextrading.com/1.0/stock/'+ stock + '/book')  
            .then(res => res.json())
            .then(data => {
              result = {stockdata:{"stock":stock, "price": data.quote.latestPrice,"likes":likes}};
              res.json(result) 
            }).catch(function(response){
              alert("No valid response");
            });  
        }
          
   
     
      }


  
  });
  
  
  //fetch();
  
    
};
