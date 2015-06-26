var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = require('../constants/constants').ActionTypes;
var AppDispatcher = require('../dispatcher/dispatcher');
var CHANGE_EVENT = 'change';
var session = {};

function _setSession(data) {
    session = data;
    localStorage.setItem('session', JSON.stringify(session));
}

function _updateSession(data) {
    session.profile = data;
    localStorage.setItem('session', JSON.stringify(session));
}

function _restoreSession() {
    session = JSON.parse(localStorage.getItem('session'));
}

function _clearSession() {
    session = {};
    localStorage.setItem('session', JSON.stringify({}));
}

_restoreSession();

var SessionStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    getData: function() {
        return session.profile;
    },
    getToken: function() {
        return session.token;
    },
    isLoggedIn: function() {
        return session && session.token;
    }
});

SessionStore.dispatchToken = AppDispatcher.register(function(action) {

    switch (action.type) {
        case ActionTypes.SIGNUP:
        case ActionTypes.LOGIN:
            _setSession(action.data);
            SessionStore.emitChange();
            break;
        case ActionTypes.LOGOUT:
            _clearSession();
            SessionStore.emitChange();
            break;
        case ActionTypes.UPDATE_PROFILE:
            _updateSession(action.data);
            SessionStore.emitChange();
            break;
        default:
            // do nothing
    }

});

module.exports = SessionStore;
