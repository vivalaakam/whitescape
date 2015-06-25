var AppDispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var ApiUtils = require('../utils/apiutils');

module.exports = {
    signup: function(data) {
        var promise = ApiUtils.signup(data);

        promise.then(function(response) {
            AppDispatcher.dispatch({
                type: ActionTypes.SIGNUP,
                data: response
            });
        } , function(data) {
          console.log(data);
        });

        return promise;
    }
};
