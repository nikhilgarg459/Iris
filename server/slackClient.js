'use strict';



var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
// var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

//var bot_token = 'xoxb-242926675313-XoraHbBOmTIkbslnJu3ncoxH';// process.env.SLACK_BOT_TOKEN || '';
let channel;
function handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

function addAuthenticatedHandler(rtm, handler){
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

module.exports.init = function slackClient(token, logLevel) {
    const rtm = new RtmClient(token, { logLevel });
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
    return rtm;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;



//let channel;

// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
// rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
//   for (const c of rtmStartData.channels) {
// 	  if (c.is_member && c.name ==='general') { channel = c.id }
//   }
//   console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
// });

// you need to wait for the client to fully connect before you can send messages
// rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
//   rtm.sendMessage("Hello!", channel);
// });

//rtm.start();