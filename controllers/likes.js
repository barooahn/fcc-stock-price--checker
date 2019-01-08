var MongoClient = require('mongodb');
const fetch = require('node-fetch');

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
const project = 'stocks';


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