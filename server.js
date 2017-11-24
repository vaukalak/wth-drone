var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyACM0', {
  baudRate: 9600
});

const treshold = 300;

port.on('data', function (bytes) {
    // if(bytes[0].toString() > treshold) {
    //    send request
    // } 
    console.log(bytes[0].toString());
});



port.on('error', function(err) {
  console.log('Error: ', err.message);
})

