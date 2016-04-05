var stampit = require('stampit'),
    client = require('jsmodbus').client.tcp.complete;

exports.loop = client.compose(require('./loop.js'));
