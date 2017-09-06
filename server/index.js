var express = require('express');
var bodyParser = require('body-parser');
// var $ = require('jQuery');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(4321, function() {
  console.log('listening on port 4321!');
});


app.post('/encrypt', (req, res) => {
  console.log('IN ENCRYPT');
  console.log('req.body', req.body);
});