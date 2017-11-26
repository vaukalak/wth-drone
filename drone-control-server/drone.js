const RollingSpider = require('rolling-spider');
const temporal = require('temporal');

const ourLog = (...args) => {
    if (false) {
        console.log(...args);    
    }
}

let connected = false;

const rollingSpider = new RollingSpider({
    logger: console.log
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

    rollingSpider.frontFlip()
    // 
    // await delay(2000);
    // rollingSpider.backFlip()
    // 
    // await delay(2000);
    // rollingSpider.rightFlip()
    // 
    // await delay(2000);
    // rollingSpider.leftFlip()
}

function emergancy() {
  rollingSpider.emergancy();
}

async function connect() {
    if (!connected) {
        await waitForCb(rollingSpider.connect.bind(rollingSpider));
        await waitForCb(rollingSpider.setup.bind(rollingSpider));
        conneted = true;
    }
}

async function extinguish() {
  await connect();
  // takeOff
  await delay(1000);
  takeOff();
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