const RollingSpider = require('rolling-spider');
const temporal = require('temporal');

const ourLog = (...args) => {
    if (false) {
        console.log(...args);    
    }
}

let connected = false;

const rollingSpider = new RollingSpider({
    // logger: console.log
});

const delay = time => new Promise(
  (res) => {
    setTimeout(res, time)
  } 
);

const waitForCb = (cb) => new Promise(
  (res) => {
    cb(res);
  }
);

function landCb() {
  console.log('land callback called');
  temporal.clear();
}

function takeOff() {
  console.log('takeoff');
  rollingSpider.flatTrim();
  rollingSpider.takeOff();
  rollingSpider.flatTrim();
}

function land() {
  rollingSpider.land(landCb);
}

function flip() {
    // flips
    rollingSpider.frontFlip();
}

function emergancy() {
  rollingSpider.emergancy();
}

async function connect() {
    
    if (!connected) {
        console.log('go to connect');
        await waitForCb(rollingSpider.connect.bind(rollingSpider));
        await waitForCb(rollingSpider.setup.bind(rollingSpider));
        conneted = true;
        console.log('CONNECTED', rollingSpider.name);
    }
}

async function extinguish() {
   console.log('await connect');
   await connect();

  // takeOff
  console.log('next step - is takeoff');
  await delay(2000);
  takeOff();
  console.log('next step is move forward');
  // forward
  await delay(2000);
  rollingSpider.forward({
    steps: 7,
  });
}



module.exports = {
  extinguish,
  emergancy,
  land,
  connect,
  flip
};