var RollingSpider = require("rolling-spider");
var temporal = require('temporal');
var rollingSpider = new RollingSpider();

console.log('drone control server started')

rollingSpider.connect(function () {
    console.log('initial connect')
    rollingSpider.setup(function () {
        console.log('Connected to drone', rollingSpider.name);
        rollingSpider.flatTrim();
        rollingSpider.takeOff();
        rollingSpider.flatTrim();
        console.log('takeoff')

        temporal.queue([

            {
                delay: 2000,
                task: function () {
                    console.log('forward');
                    rollingSpider.forward({steps: 4});
                }
            },
            {
                delay: 4000,
                task: function () {
                    console.log('land');
                    rollingSpider.land();
                }
            },
            {
                delay: 5000,
                task: function () {
                    temporal.clear();
                    process.exit(0);
                }
            }
        ]);
    });
});