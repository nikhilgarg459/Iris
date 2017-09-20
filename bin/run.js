'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);

const slackToken = 'xoxb-242926675313-XoraHbBOmTIkbslnJu3ncoxH';
const slackLogLevel = 'verbose';
const rtm = slackClient.init(slackToken, slackLogLevel);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, ()=>{
    server.listen(3001);
});

//server.listen(3001);

server.on('listening', function(){
    console.log(`IRIS is listenong on ${server.address().port} in ${service.get('env')} mode`); 
});