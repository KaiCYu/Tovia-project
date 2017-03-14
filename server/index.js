var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mysql');
var request = require('request');
var parseString = require('xml2js').parseString;
var dB = require('../database-mysql/index');

// var $ = require('jQuery');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({extended: true}));

//listen for POST request from C. "listening" at /collection
app.post('/collection', function (req, res) {
  var username = Object.keys(req.body)[0];
  console.log('searched username', username);
  var game;
  var options = {
    url: `http://www.boardgamegeek.com/xmlapi/collection/${username}`,
    headers: {
      'Content-Type': 'text/xml'
    }
  };

  //send GET to API
  request(options, function (err1, result1) {
    if (err1) { console.log('ERROR SENDING GET', err1); }
    //massage data
    parseString(result1.body, function (err2, result2) {
      if (err2) { console.log('ERROR PARSING XML', err2);}
      // console.log('result object from API', result2);
      var gameList = result2.items.item;
      //store into DB
      dB.storeToDB(gameList, function (err3, result3) {
        if (err3) { console.log('ERROR STORING INTO DB', err3);}
        //query DB for a random game
        dB.selectRandomGame(function (err4, result4) {
          if (err4) { console.log('ERROR RETRIEVING FROM DB', err4);}
          var randomGame = result4[0].game_name;
          console.log('random game', randomGame);
          res.status(302).send(randomGame);
        });
      });
    });
  });
});


app.listen(4321, function() {
  console.log('listening on port 4321!');
});
