var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mysql');
var request = require('request');
var parseString = require('xml2js').parseString;

// var $ = require('jQuery');
// var items = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use( bodyParser.json() );


app.post('/collection', function (req, res) {
  var options = {
    url: `http://www.boardgamegeek.com/xmlapi/collection/BoBaTheBear`,
    headers: {
      'Content-Type': 'text/xml'
    }
  };

  request(options, function (err1, result1) {
    if (err1) { console.log('ERROR SENDING GET', err1); }

    parseString(result1.body, function (err2, result2) {
      if (err2) { console.log('ERROR PARSING XML', err2);}
      // console.log('parsed xml: ', result2.items.item);
      var gameList = result2.items.item;
      console.log('inside parse string async', gameList);
      res.send(gameList);
    });
  })

  // items.selectAll(function(err, data) {
  //   if(err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.json(data);
  //   }
  // });
});


app.listen(4321, function() {
  console.log('listening on port 4321!');
});
