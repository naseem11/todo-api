// const MongoClient=require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log('Unable to connect to mongoDB', err);
    }

    var db = client.db('TodoApp');

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5a860b47ce69c022c89708c5')
    },
        {
            //  $set is mongoDB update operator 
            $set: {
                text: 'go to city'
            }
        },
        { returnOriginal: false }, (err, result) => {

            if (err) {
                return console.log('Unable to delete', err);
            }
            console.log(result);
        });
    client.close();
});