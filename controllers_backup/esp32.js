load('api_timer.js');
load('api_http.js');
load('api_adc.js');

let TRESHOLD = 3;
let alreadyDetected = false;


print('enable pin:', ADC.enable(32));
Timer.set(1000, true, function(){
  let level =  ADC.read(32);
  print('read: ', level);
  if(level > TRESHOLD && !alreadyDetected) {
    alreadyDetected = true;
    print('DETECTED!');
    sendFireDetected();
  }
}, null);

function sendFireDetected() {
    HTTP.query({
    url: 'http://10.168.0.138:3000/fire-detected',
    headers: {
      'Content-Type': 'application/json'
    },
    // data to perform POST otherwise default is GET     
    data: {
      type: 'IK-sensor'
    },      
    success: function(body, full_http_msg) { print(body); },
    error: function(err) { print(err); }
  });
}

