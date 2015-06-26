var actions = require('../actions/actions');
var request = require('superagent');
var Promise = require('promise/lib/es6-extensions');
var SessionStore = require('../stores/session');
module.exports = {
    signup: function(data) {
        return new Promise(function(resolve, reject) {
            request
                .post('https://shrouded-tundra-7473.herokuapp.com:443/api/account/signup/')
                .send(data)
                .end(function(error, res) {
                    if (res) {
                        var data = JSON.parse(res.text);
                        if (res.status === 201) {
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    }
                });
        });
    },
    login: function(data) {
        return new Promise(function(resolve, reject) {
            request
                .post('https://shrouded-tundra-7473.herokuapp.com:443/api/account/login/')
                .send(data)
                .end(function(error, res) {
                    if (res) {
                        var data = JSON.parse(res.text);
                        if (res.status === 200) {
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    }
                });
        });
    },
    updateProfile: function(data) {
        return new Promise(function(resolve, reject) {
            request
                .put('https://shrouded-tundra-7473.herokuapp.com:443/api/account/')
                .set('Authorization', 'JWT '+ SessionStore.getToken())
                .send(data)
                .end(function(error, res) {
                    if (res) {
                        var data = JSON.parse(res.text);
                        if (res.status === 200) {
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    }
                });
        });
    }
};
