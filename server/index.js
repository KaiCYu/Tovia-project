const express = require('express');
const bodyParser = require('body-parser');
// const $ = require('jQuery');

const app = express();
const cache = {};

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(4321, function() {
  console.log('listening on port 4321!');
});


app.post('/encrypt', (req, res) => {
  console.log('req.body', req.body);
  let encoded = randomText(200, 'aA#');

  if (!cache[req.body.passphrase]) {
    cache[req.body.passphrase] = {
      expireDate: req.body.expireDate,
    }
    cache[req.body.passphrase][encoded] = req.body.message;
  } else {
    console.log('ERROR: THE MESSAGE IS ALREADY CACHED');
  }

  console.log('CACHE OBJECT', cache);
  res.send(encoded);
});

app.get('/decrypt', (req, res) => {
  console.log('INSIDE DECRYPT');
  console.log('cache', cache);
  // console.log('decoded ',req.query.decoded, 'passphrase ', req.query.passphrase);
  //access the cache, return the message
  let decoded = req.query.decoded;
  let passphrase = req.query.passphrase;

  if (cache[passphrase] && cache[passphrase][decoded]) {
    res.send(cache[passphrase][decoded]);
  } else {
    res.status(500).send('Message could not be decrypted!')
  }
})


const randomText = (length, chars) => {
  var mask = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789';
  var result = '';
  for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
  return result;
}