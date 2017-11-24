var RollingSpider = require("rolling-spider");
var temporal = require('temporal');
var rollingSpider = new RollingSpider();
console.log('start')
rollingSpider.connect(function () {
    console.log('connected')
    rollingSpider.setup(function () {
        console.log('takeoff')
        //rollingSpider.takeOff();
        // console.log('flatTrim')
        // rollingSpider.flatTrim();
        // rollingSpider.startPing();
        // rollingSpider.flatTrim();

        // temporal.queue([
        //     {
        //         delay: 5000,
        //         task: function () {
        //             console.log('takeoff')
        //             rollingSpider.takeOff();
        //             rollingSpider.flatTrim();
        //         }
        //     },
        //     {
        //         delay: 3000,
        //         task: function () {
        //             rollingSpider.forward();
        //         }
        //     },
        //     {
        //         delay: 5000,
        //         task: function () {
        //             rollingSpider.land();
        //         }
        //     },
        //     {
        //         delay: 5000,
        //         task: function () {
        //             temporal.clear();
        //             process.exit(0);
        //         }
        //     }
        // ]);
    });
});