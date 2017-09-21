'use strict';

const config = require('../config');
const slackClient = require('../server/slackClient');
const service = require('../server/service')(config);
const http = require('http');

const server = http.createServer(service);

const witToken = config.witToken;
const witClient = require('../server/witClient')(witToken);

const slackToken = config.slackToken;
const slackLogLevel = 'verbose';

const serviceRegistry = service.get('serviceRegistry');

const rtm = slackClient.init(slackToken, slackLogLevel, witClient, serviceRegistry);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => {
    server.listen(3001);
});

//server.listen(3001);

server.on('listening', function () {
    console.log(`IRIS is listenong on ${server.address().port} in ${service.get('env')} mode`);
});