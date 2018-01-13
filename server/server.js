const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Promise = require('bluebird');
const completed = require('./routes/Completed');
const inProgress = require('./routes/InProgress');
const deleteTodo = require('./routes/DeleteToDo');
const models = require('./models');
const toggleToDo = require('./routes/ToggleToDo');
const PORT = process.env.PORT || 5000;

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

//Set Static Path
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
} else {
    app.use(express.static(__dirname + '/../client/build'));
}

//Temporarily adding this back in - Need it to render for current test
app.get('/api', (req, res) => {
   res.send(['rory', 'joe', 'boi']);
});

//Either getting or posting Completed and In Progress To-Do's
app.get('/completed', completed.getCompleted);
app.post('/inprogress', inProgress.postInProgress);
app.get('/inprogress', inProgress.getInProgress);
app.put('/toggleTodo', toggleToDo.ToggleToDo);

    // models.User.create({
    //   username: 'samTheUser',
    //   password: 'haha'
    // }).then(function() {
    //   console.log('we did it');
    //   // res.redirect('/');
    // });

    // models.ToDo.create({
    //     UserId: 1,
    //     isCompleted: false,
    //     isDeleted: false
    //   }).then(function() {
    //     console.log('Todo Created')
    // });

// models.User.findAll()
//   .then((data) => {
//     let date = new Date(data[0].createdAt);
//     console.log('hello sir', (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());
//   });



//Listening to port
app.listen(PORT);
