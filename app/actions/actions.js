var AppDispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var ApiUtils = require('../utils/apiutils');

module.exports = {
    signup: function(data) {
        ApiUtils.signup(data)
            .then(function(response) {
                AppDispatcher.dispatch({
                    type: ActionTypes.SIGNUP,
                    data: response
                });
            }, function(data) {
                var errors = [];

                for (var key in data) {
                    var value;
                    switch (key) {
                        case 'email':
                        case 'password':
                            value = 'Field ' + key + ' can`t be empty';
                            break;
                    }
                    errors.push({
                        name: key,
                        value: value
                    });
                }
                AppDispatcher.dispatch({
                    type: ActionTypes.SET_ERRORS,
                    errors: errors
                });
            });
    },
    login: function(email, password) {
        ApiUtils.login({
                email: email,
                password: password
            })
            .then(function(response) {
                AppDispatcher.dispatch({
                    type: ActionTypes.LOGIN,
                    data: response
                });
            }, function(data) {
                var errors = [];

                for (var key in data) {
                    var value;
                    switch (key) {
                        case 'non_field_errors':
                            value = data[key];
                            break;
                        case 'email':
                        case 'password':
                            value = 'Field ' + key + ' can`t be empty';
                            break;
                    }
                    errors.push({
                        name: key,
                        value: value
                    });
                }
                AppDispatcher.dispatch({
                    type: ActionTypes.SET_ERRORS,
                    errors: errors
                });
            });
    },
    logout: function() {
        AppDispatcher.dispatch({
            type: ActionTypes.LOGOUT,
        });
    },
    updateProfile: function(data) {
        return ApiUtils.updateProfile(data)
            .then(function(response) {
                AppDispatcher.dispatch({
                    type: ActionTypes.UPDATE_PROFILE,
                    data: response
                });
            });
    },
    addMessage: function(message) {
        return ApiUtils.addMessage(message)
            .then(function(response) {
                AppDispatcher.dispatch({
                    type: ActionTypes.ADD_MESSAGE,
                    data: response
                });
            });
    },
    loadMessages: function(page) {
        if (!page) {
            page = 1;
        }
        return ApiUtils.loadMessages(page, 10)
            .then(function(response) {
                AppDispatcher.dispatch({
                    type: ActionTypes.LOAD_MESSAGES,
                    data: response,
                    page: page
                });
            });
    },
    removeMessage: function(message) {
        return ApiUtils.removeMessage(message.id)
            .then(function(response) {
                AppDispatcher.dispatch({
                    type: ActionTypes.REMOVE_MESSAGE,
                    data: message,
                });
            });
    }
};
