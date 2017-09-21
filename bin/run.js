'use strict';

const config = require('../config');
const SlackClient = require('../server/slackClient');
const service = require('../server/service')(config);
const http = require('http');

const server = http.createServer(service);

const witToken = config.witToken;
const WitClient = require('../server/witClient');
const witClient = new WitClient(witToken);

const serviceRegistry = service.get('serviceRegistry');
const slackClient = new SlackClient(config.slackToken, config.slackLogLevel, witClient, serviceRegistry)

slackClient.start(()=>{
    server.listen(3001);
});

server.on('listening', function () {
    console.log(`IRIS is listenong on ${server.address().port} in ${service.get('env')} mode`);
});