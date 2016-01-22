//start.js
'use strict';

var express = require('express');

var app = express();

var parser = require('body-parser');

var marketListDB = require('./server/items.js');

var port = 5000;

app.use(express.static('dist'));

app.listen(port, function(err) {
	console.log('running server on port ' + port);
})

app.get('/', function(req, res) {
	res.render('index');
	//res.sendFile('/index.html');
});





app.use(parser.json());
app.use(parser.urlencoded({ extended: true}));

marketListDB(app);