var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));



//Database configuration
mongoose.connect('mongodb://localhost/week18day3mongoose');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

//Require Schema
var Example = require('./exampleModel.js');





// Routes
app.get('/', function(req, res) {
  res.send(index.html);
});


app.post('/submit', function(req, res) {

	//Inserting an array and a boolean into the req.body object for example purposes
	req.body.array = ["item1", "item2", "item3"];
	req.body.boolean = false;


  var content = new Example(req.body);

  content.save(function(err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});




app.listen(3001, function() {
  console.log('App running on port 3001!');
});
