var Loop = require('../src/index.js').loop,
    loop;

var loop = Loop({
    'host'          : process.argv[2],
    'port'          : process.argv[3],
    'loopDuration'  : 100,
    'logEnabled'    : true,
    'logLevel'      : 'info'
});

loop.loopHoldingRegisters(0, 20)
    .loopHoldingRegisters(34, 55)
    .loopHoldingRegisters(100, 120);

loop.on('connect', function () {

    loop.startLoop();

});

loop.on('loopUpdate', function (regs, time) {

    console.log('LOOP Update', time);

});

loop.connect();

process.on('SIGINT', function () {

    loop.stopLoop();

    loop.close();

});
