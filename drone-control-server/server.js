const express = require('express');
const drone = require('./drone');
const bodyParser = require('body-parser');

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
  if (d === 'connect') {
      drone.connect();
  }
  if (d === 'flip') {
      drone.flip();
  }
  console.log(`you entered: ${d}`);
});

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.post('/fire-alarm', (req, res) => {
  const { sensorId } = req.body;

  const message = `Smoke detected at sensor ${sensorId}!`;
  console.log(message);

  drone.extinguish(sensorId);

  res.send(message);
});

app.post('/fire-detected', (req, res) => {

  const message = `Fire detected!`;
  console.log(message);
  
  drone.flip();
  
  // drone.land();

  res.send(message);
});

app.listen(3000);

console.log('drone control server started');
drone.connect();
