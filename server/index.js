const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const cache = {};

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(4321, function() {
  console.log('listening on port 4321!');
});

app.post('/encrypt', (req, res) => {
  let encoded = randomText(200, 'aA#');
  let passphrase = req.body.passphrase
  if (!cache[passphrase]) {
    cache[passphrase] = {
      expireDate: req.body.expireDate,
      name: req.body.name,
    }
    cache[passphrase][encoded] = req.body.message;
  } else {
    res.status(500).send('ERROR: THE MESSAGE IS ALREADY CACHED')
  }
  res.send(encoded);
});

app.get('/decrypt', (req, res) => {
  let decoded = req.query.decoded;
  let passphrase = req.query.passphrase;
  let currentTime = req.query.currentTime;
  let expireDate = Date.parse(cache[passphrase].expireDate);

  if (cache[passphrase] && cache[passphrase][decoded] && expireDate > currentTime) {
    res.send({
      name: cache[passphrase].name,
      message: cache[passphrase][decoded],
      expireDate: cache[passphrase].expireDate,
    });
  } else {
    res.status(500).send('Message could not be decrypted or has expired!')
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