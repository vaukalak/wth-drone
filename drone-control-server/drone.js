var RollingSpider = require("rolling-spider");
var temporal = require('temporal');
var rollingSpider = new RollingSpider();

function extinguish(destination) {
    console.log('Before connecting to drone');
    rollingSpider.connect(function() {
        console.log('Connected to drone');
        // rollingSpider.setup(function() {
        //     console.log('Connected to drone', rollingSpider.name);
        //     temporal.queue([{
        //             delay: 1000,
        //             task: function() {
        //                 console.log('takeoff');
        //                 rollingSpider.flatTrim();
        //                 rollingSpider.takeOff();
        //                 rollingSpider.flatTrim();
        //             }
        //         },
        // 
        //         {
        //             delay: 2000,
        //             task: function() {
        //                 console.log('forward');
        //                 rollingSpider.forward({
        //                     steps: 10
        //                 });
        //             }
        //         },
        //         {
        //             delay: 4000,
        //             task: function() {
        //                 console.log('land');
        //                 rollingSpider.land();
        //             }
        //         },
        //         {
        //             delay: 5000,
        //             task: function() {
        //                 temporal.clear();
        //                 process.exit(0);
        //             }
        //         }
        //     ]);
        // });
    });
}

module.exports = {
    extinguish,
};
