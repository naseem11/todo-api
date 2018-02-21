const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _=require('lodash');


var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { Todo } = require('./models/todo');

const port=process.env.PORT||3000;


var app = express();

app.use(bodyParser.json());

// POST  todo.......................................//////

app.post('/todos', (req, res) => {

    var todo = new Todo({

        text: req.body.text

    });

    todo.save().then((doc) => {

        res.send(doc);

    }, (err) => {

        res.status(400).send(err);


    });

});

// End POST....................

// get all Todos.......................................////////////////////

app.get('/todos', (req, res) => {

    Todo.find().then((todos) => {

        res.send({ todos });

    }, (err => {

        res.status(400).send(err);

    }));

});


// Getting a single todo.......

app.get('/todos/:id', (req, res) => {

    var id = req.params.id;

    if (!(ObjectID.isValid(id))) {

        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {

        if (!todo) {
            return res.status(404).send();

        }
        res.send({todo});

    }, (err) => {

        res.status(400).send();
    });





});

// Delete todo by Id........

app.delete('/todos/:id', (req, res) => {

    var id = req.params.id;

    if (!(ObjectID.isValid(id))) {

        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {

        if (!todo) {
            return res.status(404).send();

        }
        res.send({todo});

    }, (err) => {

        res.status(400).send();
    });





});


// Updating a todo....

app.patch('/todos/:id',(req,res)=>{
 
    var id=req.params.id;
    if(!ObjectID.isValid(id)){

        return res.status(404).send();
    }

    var body=_.pick(req.body,["text","completed"]);
    if(_.isBoolean(body.completed)&& body.completed){
    
        body.completedAt=new Date().getTime();

    } else{

      body.completedAt=null;
      body.completed=false;

    }

    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
        if(!todo){

            return res.status(404).send();
        }
        res.send({todo});
    },(err)=>{

        res.status(400).send();
    });

});


app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);

});

module.exports = { app };









// var newUser = new User({

//     email: 'abc@gmail.com'

// });


// newUser.save().then((doc) => {
//     console.log(doc);
// }, (err) => {
//         console.log('Error !!!!!!!', err)

//     });





