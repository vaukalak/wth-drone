var RollingSpider = require("rolling-spider");
var temporal = require('temporal');
var rollingSpider = new RollingSpider();

function extinguish(destination) {
    console.log('Going to extinguish, waiting for connect');
    rollingSpider.connect(function() {
        console.log('Connected to drone');
        rollingSpider.setup(function() {
            console.log('Connected to drone', rollingSpider.name);
            temporal.queue([{
                    delay: 1000,
                    task: function() {
                        console.log('takeoff');
                        rollingSpider.flatTrim();
                        rollingSpider.takeOff();
                        rollingSpider.flatTrim();
                    }
                },
            
                {
                    delay: 2000,
                    task: function() {
                        console.log('forward');
                        rollingSpider.forward({
                            steps: 14
                        });
                    }
                },
                {
                    delay: 4000,
                    task: land
                }
            ]);
        });
    });
}

function emergancy() {
    rollingSpider.emergancy()
}

function land() {
    console.log('land');
    rollingSpider.land(landCb);
}
 
function landCb() {
    console.log('land callback called');
    temporal.clear();
}

module.exports = {
    extinguish,
    emergancy,
    land
};
