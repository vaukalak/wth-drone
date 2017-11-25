const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyACM0', {
  baudRate: 9600
});
const request = require('superagent');

const TRESHOLD = 1;

port.on('data',  (bytes) => {
    let level = bytes[0].toString();
    console.log(level);
    
    if(level > TRESHOLD) {
        request
           .post('/api/fire-alarm')
           .send({ sensorId: 'SomeId'})
           .set('accept', 'json')
           .end((err, res) => {
             // Calling the end function will send the request
           });
    } 

});

port.on('error', (err) => {
  console.log('Error: ', err.message);
})

