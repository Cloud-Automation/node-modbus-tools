# jsModbus Tools

jsModbus Tools is a collection of usefull extension to the jsModbus Module.

## Installation

Install it through npm by typing `npm install --save jsmodbus-tools`.

## Modbus Loop

Poll certain registers periodically.

    var loop = require('jsmodbus-tools').loop;

    // loop is a basic tcp modbus client from the jsmodbus module
    // with some extra parameters

    client = loop({
        'host'          : someHost,
        'port'          : somePort,
        'loopDuration'  : 500, // in ms
        'bufferSize'    : 4096 // in bytes
        });

    // loopHoldingRegisters registers the
    // start and count values to be polled
    
    client.loopHoldingRegisters(start, count);
    

    // connects the client as usual and starts
    // the loop as soon as the connection
    // is established

    client.connect();
    
    client.on('loopUpdate', function (regs, diffTime) {
        
        // in the registers you can get the requested values
        // in the loopHoldingRegister call earlier

        // the diffTime parameter indicates how much
        // time is left till the next loop
        // if the loop took longer than the
        // loopDuration value then diffTime will be 0

        // Change in Version 0.1.3!! regs are now Buffers!
        
        }); 

    setTimeout(function () {

        // stop the loop manually

        client.stopLoop();

    }, 10000);

    setTimeout(function () {
    
        // start the loop manually

        client.startLoop();    
        
    }, 15000)


# License

Copyright (C) 2016 Stefan Poeter (Stefan.Poeter[at]cloud-automation.de)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
