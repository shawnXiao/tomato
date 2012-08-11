var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose');

var app = new express();

//model
//mongoose.connect('mongodb://localhost/test');
var db = mongoose.createConnection('localhost', 'test1');
db.on('error', console.error.bind(console, 'connection error'));

var Todo = db.model('Todo', new mongoose.Schema({
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
        console.log(todos);
        return res.send(todos);
    });
});

app.post('/api/todos', function (req, res) {
    var todo;
    console.log('req.body:', req.body);
    todo = new Todo({
        text: req.body.title,
        done: req.body.done,
        order: req.body.order
    });
    console.log("todo: ", todo);
    todo.save(function (err) {
        if (!err) {
            return console.log("created");
        }
    });
    return res.send(todo);
});

app.delete("/api/todos/:id", function () {
    console.log("deleting");
    return Todo.findById (req.params.id, function (err, todo) {
        return todo.remove(function (err) {
            if (!err) {
                console.log("removed");
                return res.send('');
            }
        });
    });
});
app.listen(3000);
console.log("listen 3000");
