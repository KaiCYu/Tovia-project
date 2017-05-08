var mysql = require('mysql');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'games'
});

var selectRandomGame = function(callback) {
  var queryStr = `SELECT * FROM collection ORDER BY RAND() LIMIT 1`
  connection.query(queryStr, function(err, rows, results) {
    if(err) {
      console.log('ERROR GETTING FROM DATABASE', err);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

// DROP TABLE IF EXISTS collection\
// CREATE TABLE IF NOT EXISTS collection\

var storeToDB = function (data, callback) {
  var queryStr = `
    INSERT IGNORE INTO collection (id, game_name) VALUES (?, ?)`;
  // console.log('DATA INSIDE DB FUNC ',data);

  for (var i = 0; i < data.length; i++) {
    var params = [data[i].$.objectid, data[i].name[0]._];
    connection.query(queryStr, params, function (err, result) {
      if (err) {
        console.log(err, 'there was an error saving the data into database');
      } else {
        console.log('record saved to database');
      }
    })
  }
  callback()
  // data.forEach( record => {
  //   console.log('RECORD ', record.$.objectid, 'GAME NAME: ', record.name[0]._);
  //   var params = [record.$.objectid, record.name[0]._];
  //   connection.query(queryStr, params, function (err, result) {
  //     if (err) {
  //       console.log(err, 'there was an error saving the data into database');
  //     } else {
  //       console.log('record saved to database');
  //     }
  //     callback()
  //   })
  // })
  //
};

module.exports.selectRandomGame = selectRandomGame;
module.exports.storeToDB = storeToDB;
