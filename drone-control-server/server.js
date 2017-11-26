const express = require('express');
const drone = require('./drone');
const bodyParser = require('body-parser');

const config = require('./.config');
const golos = require("./golos-js/lib/index");

const app = express();
const stdin = process.openStdin();

stdin.addListener('data', (initialD) => {
  const d = initialD.toString().trim();

  if (d === 'exit') {
    console.log('BYE');
    process.exit();
  }
  if (d === 'e') {
    console.log('TURN OFF');
    drone.emergancy();
  }
  if (d === 'land') {
    console.log('LAND');
    drone.land();
  }
  if(d === 'fire') {
      console.log('ESTINGUISH');
      drone.extinguish();
  }
  if (d === 'debug') {
      console.log('DEBUG CONNECTION');
      drone.debug();
  }
  console.log(`you entered: ${d}`);
});

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.post('/fire-alarm', (req, res) => {
  const { sensorId } = req.body;

  const message = `Fire in the hole at sensor ${sensorId}!`;
  console.log(message);

  drone.extinguish(sensorId);

  checkBalance('drone-wth', function (err, res) {
    console.log('checkBalance', err, res);
  });

  res.send(message);
});

app.post('/fire-detected', (req, res) => {

  const message = `Fire in the hole detected!`;
  console.log(message);

  //drone.extinguish(sensorId);

  sendGolos('0.100', config.golos_user, 'krivov', config.golos_password);

  res.send(message);
});

app.listen(3000);

console.log('drone control server started');

function checkBalance(name, cb) {
  try {

    golos.api.getAccounts([name], function(err, result) {
      if (!err) {
        cb(null, result[0].balance.match(/\d*\.\d*/)[0]);
      } else {
        cb(err);
      }
    });

  } catch (err) {
    cb(err);
  }
}

function sendGolos(amount, from, to, password) {
  try {
    var t = golos.auth.getPrivateKeys(from, password);

    golos.broadcast.transfer(t.owner, from, to, amount + " GOLOS", "Fire detected - drone WTH.by #wth2017", function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Payment ok');
      }
    });
  } catch (err) {
    cb(err);
  }
}