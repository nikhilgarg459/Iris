'use strict';

const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);

server.listen(3001);

server.on('listening', function(){
    console.log(`IRIS is listenong on ${server.address().port} in ${service.get('env')} mode`); 
});