var express=require('express');
var bodyParser=require('body-parser');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');


var app =express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{

   var todo=new Todo({

    text: req.body.text

   });

   todo.save().then((doc)=>{

    res.send(doc);

   },(err)=>{

    res.status(400).send(err);
   

   });

});


app.listen(3000,()=>{
console.log('Server is up on port 3000');

});









// var newUser = new User({

//     email: 'abc@gmail.com'

// });


// newUser.save().then((doc) => {
//     console.log(doc);
// }, (err) => {
//         console.log('Error !!!!!!!', err)

//     });





