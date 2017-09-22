'use strict';

const should = require('should');
const config = require('../../config');
const service = require('../../server/service')(config);
const request = require('supertest');

describe('The express service', () => {
    describe('PUT /foo', () => {
        it('should return HTTP 404', (done) => {
            request(service)
                .put('/foo')
                .expect(404, done);
        });
    });
});

describe('PUT /service/:intent/:port', () => {
    it('should return HTTP 200 with valid result', (done) => {
        request(service)
            .put('/service/test/9999')
            .set('X-IRIS-API-TOKEN', config.irisApiToken)
            .set('X-IRIS-SERVICE-TOKEN', 'SOMETHING')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                res.body.result.should.startWith('test at');
                return done();
            });
    });

    it('should return HTTP 403 when noo API token provided', (done) => {
        request(service)
            .put('/service/test/9999')
            .expect(403)
            .end(done);
    });
    
    it('should return HTTP 400 when X-IRIS-SERVICE-TOKEN is not present', (done) => {
        request(service) 
            .put('/service/test/9999')
            .set('X-IRIS-API-TOKEN', config.irisApiToken)
            .expect(400)
            .end(done);
    });    
});