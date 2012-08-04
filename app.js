var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose');

var app =  new express();

//model
mongoose.connect('mongodb://localhost/test');

var Todo = mongoose.model('Todo', new mongoose.Schema({
    text: String,
    done: Boolean,
    order: Number
}));

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(application_root));
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
    app.set('views', application_root);
    app.engine('html', require('ejs').renderFile);
});

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/todo', function (req, res) {
    res.render('index.html');
});

app.get('/api/todos', function (req, res) {
    return Todo.find(function (err, todos) {
        return res.send(todos);
    });
});

app.listen(3000);
console.log("listen 3000");
