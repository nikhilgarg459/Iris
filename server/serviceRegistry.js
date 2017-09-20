'use strict';

class ServiceRegistry{

    constructor(){
        this._services = [];
        this._timeout = 30;  //Timeout if microservice doesn't announce after 30 seconds
    }

    add(intent, ip, port){
        const key = intent + ip + port;
        if(!this._services[key]){
            this._services[key] = {};
            this._services[key].timestamp = Math.floor(new Date() / 1000); // new DAte will return timestamp in milliseconds, so converting it to seconds
            this._services[key].ip = ip;
            this._services[key].port = port;
            this._services[key].intent = intent;

            console.log(`Added service for intent ${intent} on ${ip}:${port}`);
            this._cleanup();
            return;
        }
        else{
            this._services[key].timestamp = Math.floor(new Date() / 1000);
            console.log(`Updated service for intent ${intent} on ${ip}:${port}`);
            this._cleanup();
        } 
    }

    remove(intent, ip, port){
        const key = intent + ip + port;
        delete  this._services[key];
    }

    get(intent){
        this._cleanup();
        for(let key in  this._services){
            if( this._services[key].intent == intent)
                return  this._services[key];
            return null;
        }
    }

    _cleanup(){
        const now = Math.floor(new Date() / 1000);
        for(let key in this._services){
            if(this._services[key].timestamp + this._timeout < now){
                console.log(`Removed service for intent ${this._services[key].intent} on ${this._services[key].ip}:${this._services[key].port}`);
                delete this._services[key];
            }
        }
    }

}

module.exports = ServiceRegistry;