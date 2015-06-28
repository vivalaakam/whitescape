var keyMirror = require('keymirror');
module.exports = {
    ActionTypes: keyMirror({
        SIGNUP: null,
        LOGIN: null,
        LOGOUT: null,
        UPDATE_PROFILE: null,
        ADD_MESSAGE: null,
        LOAD_MESSAGES: null,
        REMOVE_MESSAGE: null,
        ADD_ERROR: null,
        SET_ERRORS: null,
        RESET_ERRORS: null
    })
};
