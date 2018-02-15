const MongoClient=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
if(err){

    return console.log('Unable to connect to mondodb server');
}
console.log('Connected with mongoDB successfully..');
var db=client.db('TodoApp');
db.collection('Users').find({name:'naseem', age:26}).toArray().then((docs)=>{

    console.log(JSON.stringify(docs,undefined,2));

}),(err)=>{

console.log('Unable to fetch documents');

};


client.close();

});