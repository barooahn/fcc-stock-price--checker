const MongoClient = require('mongodb');
const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
const project = 'stocks';
const fetch = require('node-fetch');

//addlike
const addLike = function(userIp, stock) {
  //check database for userIp
  //if not there save userIp, stock
  //if there update stock

  return new Promise((resolve, reject) => {
    MongoClient.connect(CONNECTION_STRING, function(err, db) {
      const collection = db.collection(project);
      collection.findAndModify(
        { userIp: userIp },
        [],
        {$set: { stock: stock }},
        {new: true,   // return new doc if one is upserted
        upsert: true}, // insert the document if it does not exist
        function(err,doc){
          if(err) reject(err)
          resolve(true);   
          //console.log(doc);
          
        }  
      );
      db.close();
    });
  });
}

const getLikes = function(stock) { 
  return new Promise((resolve, reject) => {
    let likes;
    MongoClient.connect(CONNECTION_STRING, function(err, db) {
      const collection = db.collection(project);
      collection.count({stock: stock}, function(err,count){
          if(err) reject(err)
          resolve(count);   
          db.close();  
      });
    }); 
  });
}

function getStock(counts, stock) {
  let count;
  Array.isArray(counts)? count = counts[1] : count = counts;  
  fetch('https://api.iextrading.com/1.0/stock/'+ stock + '/book')  
    .then(res => res.json())
    .then(data => {
      return {stockdata:{"stock":stock, "price": data.quote.latestPrice,"likes":count}};
    }).catch(function(res){
      res.send("Cannot find stock");
    }); 
}

module.exports = {
  getLikes: getLikes, addLike:addLike, getStock:getStock
}
