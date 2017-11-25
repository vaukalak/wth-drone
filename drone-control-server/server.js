const express = require('express');
const drone = require('./drone');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

app.post('/fire-alarm', function(req, res) {
    const sensorId = req.body.sensorId;

    const message = `Fire in the hole at sensor ${sensorId}!`;
    console.log(message);

    drone.extinguish(sensorId);

    res.send(message);
});

app.listen(3000);

console.log('drone control server started');
