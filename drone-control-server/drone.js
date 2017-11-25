const RollingSpider = require('rolling-spider');
const temporal = require('temporal');

const rollingSpider = new RollingSpider();

function landCb() {
  console.log('land callback called');
  temporal.clear();
}

function land() {
  console.log('land');
  rollingSpider.land(landCb);
}

function emergancy() {
  rollingSpider.emergancy();
}

function debug() {
    rollingSpider.connect(() => {
      console.log('Connected to drone');
      rollingSpider.disconnect(() => console.log('disconnected'))
  });
}

function extinguish() {
  console.log('Going to extinguish, waiting for connect');
  rollingSpider.connect(() => {
    console.log('Connected to drone');
    rollingSpider.setup(() => {
      console.log('Connected to drone', rollingSpider.name);
      temporal.queue([{
        delay: 1000,
        task() {
          console.log('takeoff');
          rollingSpider.flatTrim();
          rollingSpider.takeOff();
          rollingSpider.flatTrim();
        },
      },

      {
        delay: 2000,
        task() {
          console.log('forward');
          rollingSpider.forward({
            steps: 14,
          });
        },
      },
      {
        delay: 4000,
        task: land,
      },
      ]);
    });
  });
}



module.exports = {
  extinguish,
  emergancy,
  land,
  debug
};
