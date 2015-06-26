var AppDispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var ApiUtils = require('../utils/apiutils');

module.exports = {
    signup: function(data) {
        return ApiUtils.signup(data)
            .then(function(response) {
                AppDispatcher.dispatch({
                    type: ActionTypes.SIGNUP,
                    data: response
                });
            }, function(data) {
                console.log(data);
            });
    },
    login: function(data) {
        return ApiUtils.login(data)
            .then(function(response) {
                AppDispatcher.dispatch({
                    type: ActionTypes.LOGIN,
                    data: response
                });
            });
    },
    logout: function() {
        AppDispatcher.dispatch({
            type: ActionTypes.LOGOUT,
        });
    }
};
