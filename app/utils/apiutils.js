var actions = require('../actions/actions');
var request = require('superagent');
var Promise = require('promise/lib/es6-extensions');

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
    }
};
