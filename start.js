//start.js
'use strict';

var express = require('express');
var app = express();
var parser = require('body-parser');

var marketListDB = require('./server/items.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/dist'));

// views is directory for all template files
app.set('views', __dirname + '/dist');
app.set('view engine', 'html');

app.get('/', function(request, response) {
  response.render('index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



app.use(parser.json());
app.use(parser.urlencoded({ extended: true}));

marketListDB(app);