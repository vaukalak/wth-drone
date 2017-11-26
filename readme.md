### Automated Drone firefighter 
This project was built on [What The Hack 2017](http://wth.by/)

Smoke sensor send signal to sensor-server. Sensor-server send request to drone-control-server.
Drone take-off (and check golos balance). Flame sensor sent request to drone-control-server and drone performs flip (and send golos). 
Also, when drone-control-serve is started you could send few commands through terminal.


We used:
- parrot Rolling Spider drone 
- [node-rolling-spider library](https://github.com/voodootikigod/node-rolling-spider) 
- blockchain platform [Golos](https://golos.io/)
- arduino and smoke sensor
- esp32 and flame sensor
