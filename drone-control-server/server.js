var express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/fire-alarm', function (req, res) {
  const sensorId = req.body.sensorId;
  
  const message = `Fire in the hole at sensor ${sensorId}!`;
  console.log(message);
  
  res.send(message);
});

app.listen(3000);
