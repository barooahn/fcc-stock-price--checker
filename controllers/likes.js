const MongoClient = require('mongodb');
const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
const project = 'stocks';

//addlike
const addLike = function(userIp, stock) {
  //check database for userIp
  //if not there save userIp, stock
  //if there update stock

  MongoClient.connect(CONNECTION_STRING, function(err, db) {
    const collection = db.collection(project);
    collection.findAndModify(
      { userIp: userIp },
      [],
      {$setOnInsert: { stock: stock }},
      {new: true, upsert: true}, 
      function(err,doc){
        if(err) throw(err)
      }  
        
    
    );
    db.close();
  });
}


const getLikes = function(stock) {
  let result; 
  MongoClient.connect(CONNECTION_STRING, function(err, db) {
    const collection = db.collection(project);
    collection.find({stock: stock}, function(err,docs){
        if(err) throw(err)
        result = docs.count()
      }  
    );
    db.close();
    return result
  }); 
}

module.exports = {
  getLikes: getLikes, addLike:addLike
}