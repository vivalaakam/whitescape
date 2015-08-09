import actions from '../actions/actions';
import request from 'superagent';
import Promise from 'promise/lib/es6-extensions';
import SessionStore from '../stores/session';

export default {
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
                .set('Authorization', 'JWT ' + SessionStore.getToken())
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
    addMessage: function(message) {
        return new Promise(function(resolve, reject) {
            request
                .post('https://shrouded-tundra-7473.herokuapp.com:443/api/messages/')
                .set('Authorization', 'JWT ' + SessionStore.getToken())
                .send({
                    text: message
                })
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
    loadMessages: function(page, page_size) {
        return new Promise(function(resolve, reject) {
            request
                .get('https://shrouded-tundra-7473.herokuapp.com:443/api/messages/?page=' + page)
                .set('Authorization', 'JWT ' + SessionStore.getToken())
                .send({
                    page: page,
                    page_size: page_size
                })
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
    removeMessage: function(id) {
        return new Promise(function(resolve, reject) {
            request
                .del('https://shrouded-tundra-7473.herokuapp.com:443/api/messages/' + id + '/')
                .set('Authorization', 'JWT ' + SessionStore.getToken())
                .send({
                    pk: id
                })
                .end(function(error, res) {
                    if (res) {
                        if (res.status === 204) {
                            resolve();
                        } else {
                            reject();
                        }
                    }
                });
        });
    }
};
