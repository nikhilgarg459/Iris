'use strict';

const request = require('superagent');

function handleWitResponse(res){
    //console.log(res);
    return res.entities;
}

module.exports = function witClient(token){
    const ask = function ask(message, cb){

        request.get('https://api.wit.ai/message')
        .set('Authorization', 'Bearer ' + token)
        .query({v: '20/09/2017'})
        .query({q: message})
        .end((err, response) => {
            if(err)
                return cb(err);

            if(response.statusCode != 200){
                return cb('Expected status 200 but got ' + response.statusCode);
            }

            const witResponse = handleWitResponse(response.body);
            cb(null, witResponse);
        });
        // console.log('ask: ' + message);
        // console.log('token: ' + token);
    }

    return {
        ask: ask
    }
}