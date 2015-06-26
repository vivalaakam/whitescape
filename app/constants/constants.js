var keyMirror = require('keymirror');
module.exports = {
    ActionTypes: keyMirror({
        SIGNUP: null,
        LOGIN: null,
        LOGOUT: null,
        UPDATE_PROFILE: null,
        ADD_MESSAGE: null,
        LOAD_MESSAGES: null
    })
};
