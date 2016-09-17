var express = require('express');
var app = express();

var mongojs = require('mongojs')
var db = mongojs('bandsDB', ['bands']);

db.bands.find(function (err, docs) {
    // docs is an array of all the documents in mycollection 
})

// this makes sure that any errors are logged if mongodb runs into an issue
db.on('error', function(err) {
  console.log('Database Error:', err);
});



// Routes
// 1. At the root path, send a simple hello world message to the browser
app.get('/', function(req, res) {
  res.send("Hello world");
});

// 2. At "/all", path, display every entry in the bands collection
app.get('/all', function(req, res) {
  // Query: In our database, go to the bands collection, then "find" everything 
  db.bands.find({}, function(err, found) {
    // log any errors if the server encounters one
    if (err) {
      console.log(err);
    } 
    // otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// 3. At "/name", path, display every entry in the bands collection, 
// sorted by name
app.get('/name', function(req, res) {
  // Query: In our database, go to the bands collection, then "find" everything,
  // but this time, sort it by name (1 means ascending order) 
  db.bands.find().sort({name:1}, function(err, found) {
    // log any errors if the server encounters one
    if (err) {
      console.log(err);
    } 
    // otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// 4. At "/weight", path, display every entry in the bands collection, 
// sorted by weight
app.get('/weight', function(req, res) {
  // Query: In our database, go to the bands collection, then "find" everything,
  // but this time, sort it by weight (-1 means descending order) 
  db.bands.find().sort({weight:-1}, function(err, found) {
    // log any errors if the server encounters one
    if (err) {
      console.log(err);
    } 
    // otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// set app to run at port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});