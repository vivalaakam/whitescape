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

function _restoreSession() {
    session = JSON.parse(localStorage.getItem('session'));
    console.log(session);
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
    getSession: function() {
        return session;
    }
});

SessionStore.dispatchToken = AppDispatcher.register(function(action) {

    switch (action.type) {
        case ActionTypes.SIGNUP:
        case ActionTypes.SIGNIN:
            _setSession(action.data);
            SessionStore.emitChange();
            break;
        default:
            // do nothing
    }

});

module.exports = SessionStore;