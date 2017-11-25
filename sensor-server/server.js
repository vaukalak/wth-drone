const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyACM1', {
  baudRate: 9600
});
const request = require('superagent');
const api = 'localhost:3000';
// const api = 'http://c56fd690.ngrok.io';
const TRESHOLD = 2;

port.on('data',  (bytes) => {
    let level = bytes.toString("ascii");
    console.log(level);
 
    if(level > TRESHOLD) {
        console.log('sending');
        request
           .post(api + '/fire-alarm')
           .send({ sensorId: 'SomeId'})
           .set('accept', 'json')
           .end((err, res) => {
            console.log(res.status);
          });
    } 

});

port.on('error', (err) => {
  console.log('Error: ', err.message);
})

