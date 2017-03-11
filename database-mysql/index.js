var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'game_collection'
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM collection', function(err, results, fields) {
    if(err) {
      console.log('ERROR DATABASE', err);
      callback(err, null);
    } else {
      console.log('RESULTS', results);
      callback(null, results);
    }
  });
};

module.exports.selectAll = selectAll;
