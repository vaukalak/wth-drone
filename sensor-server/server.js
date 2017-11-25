var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyACM0', {
  baudRate: 9600
});
const request = require('superagent');

const treshold = 300;

port.on('data', function (bytes) {
    if(bytes[0].toString() > treshold) {
        request
           .post('/api/fire-alarm')
           .send({ sensorId: 'SomeId'})
           .set('X-API-Key', 'foobar')
           .set('accept', 'json')
           .end((err, res) => {
             // Calling the end function will send the request
           });
    } 
    console.log(bytes[0].toString());
});



port.on('error', function(err) {
  console.log('Error: ', err.message);
})

