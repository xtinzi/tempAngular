var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

 var index = require('./routes/index');
var todolist = require('./routes/todolist');
var cors = require("cors")

var port =  3000;

var app = express();
app.use(cors())

 View Engine
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');
 app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client/src')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

 app.use('/', index);
app.use('/api', todolist);

app.listen(port, function(){
    console.log('Server started on port ' + port);
});
