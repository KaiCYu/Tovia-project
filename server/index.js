var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mysql');
var request = require('request');
var parseString = require('xml2js').parseString;
var dB = require('../database-mysql/index');

// var $ = require('jQuery');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

//listen for POST request from C. "listening" at /collection
app.post('/collection', function (req, res) {
  var options = {
    url: `http://www.boardgamegeek.com/xmlapi/collection/BoBaTheBear`,
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
      var gameList = result2.items.item;
      //store into DB
      dB.storeToDB(gameList, function (err3, result3) {
        if (err3) { console.log('ERROR STORING INTO DB', err3);}
        //query DB for whole collection
        dB.selectAll(function (err4, result4) {
          if (err4) { console.log('ERROR RETRIEVING FROM DB', err4);}
          console.log('RESULTS FROM DB QUERY: ', result4);
        })
      });

      // res.send(gameList);
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
