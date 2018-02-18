const MongoClient=require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{

if(err){
     return console.log('Unable to connect to mongoDB', err);
}

var db=client.db('TodoApp');

db.collection('Todos').deleteMany({text:'Something to do'},(err,commandresult)=>{

if(err){
    return console.log('Unable to delete', err);
}
 console.log(commandresult.result);
});
 client.close();
});