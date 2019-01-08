/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
const fetch = require('node-fetch');
const likeController = require("../controllers/likes");
const async = require('async');

module.exports = function (app) {
      
  //getlikes
    //find stock 
    //return count of results
 
  
  app.route('/api/stock-prices')
    .get(function (req, res){

      console.log(req.query);
     
      if(req.query.stock) {
        let result;
        let likes;
        let stock = req.query.stock
        let loops = 1;
        if (typeof stock == 'object'){
          const stock1 = stock[0].toUpperCase();
          const stock2 = stock[1].toUpperCase();
          let promise1;
          let promise2;
             
          likeController.getLikes(stock1, function(err, count){
            promise1 = count;    
            console.log(count);
          });
          likeController.getLikes(stock2, function(err, count){
            promise2 = count;  
            console.log(count);
          });

          
          Promise.all([promise1, promise2]).then(function(values) {
            console.log(values);
          console.log('promise1', promise1);
          console.log('promise2', promise2);
          });
          
          if(req.query.like) {}
         
          
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
            //console.log(userIp);
            likeController.addLike(userIp, stock);
            likeController.getLikes(stock, function(err, count){
              //console.log('count', count); 
              fetch('https://api.iextrading.com/1.0/stock/'+ stock + '/book')  
                .then(res => res.json())
                .then(data => {
                  result = {stockdata:{"stock":stock, "price": data.quote.latestPrice,"likes":count}};
                  res.json(result) 
                }).catch(function(response){
                  alert("No valid response");
                });  
            });
            console.log('likes',likes);
          }
        }
      }
  });    
};
