var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = require('../constants/constants').ActionTypes;
var AppDispatcher = require('../dispatcher/dispatcher');
var CHANGE_EVENT = 'change';
var messages = [];

function _addMessage(data) {
    messages.unshift(data);
}

function _loadMessages(resp) {
    messages = messages.concat(resp);
}

var MessageStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    getMessages: function() {
        return messages;
    },
    getMessage: function(index) {
        if (!index) {
            index = 0;
        }
        return messages[index];
    }
});

MessageStore.dispatchToken = AppDispatcher.register(function(action) {

    switch (action.type) {
        case ActionTypes.ADD_MESSAGE:
            _addMessage(action.data);
            MessageStore.emitChange();
            break;
        case ActionTypes.LOAD_MESSAGES:
            _loadMessages(action.data.results);
            MessageStore.emitChange();
            break;
        default:
            // do nothing
    }

});

module.exports = MessageStore;
