'use strict';

const request = require('superagent');

function handleWitResponse(res) {
    return res.entities;
}

class WitClient {
    constructor(token) {
        this._token = token;
    }

    ask(message, cb) {
        request.get('https://api.wit.ai/message')
            .set('Authorization', 'Bearer ' + this._token)
            .query({ v: '20/09/2017' })
            .query({ q: message })
            .end((err, response) => {
                if (err)
                    return cb(err);

                if (response.statusCode != 200) {
                    return cb('Expected status 200 but got ' + response.statusCode);
                }

                const witResponse = handleWitResponse(response.body);
                cb(null, witResponse);
            });
    }
}

module.exports = WitClient;