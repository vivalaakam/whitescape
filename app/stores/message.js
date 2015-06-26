var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = require('../constants/constants').ActionTypes;
var AppDispatcher = require('../dispatcher/dispatcher');
var CHANGE_EVENT = 'change';
var messages = [],
    message_ids = [];
next = null;

function _next(url) {
    if (url) {
        var re = /\?page=(\d+)/;
        var page = re.exec(url);
        next = page[1];
    } else {
        next = false;
    }
}


function _addMessage(data, rev) {
    if (rev) {
        messages.push(data);
        message_ids.push(data.id);
    } else {
        messages.unshift(data);
        message_ids.unshift(data.id);
    }
}

function _loadMessages(resp) {
    resp.forEach(function(message) {
        if (message_ids.indexOf(message.id) === -1) {
            _addMessage(message, true);
        }
    });
}

function _removeMessage(data) {
    var index = messages.indexOf(data);
    if (index > -1) {
        messages.splice(index, 1);
    }
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
    },
    getNext: function() {
        return next;
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
            _next(action.data.next);
            MessageStore.emitChange();
            break;
        case ActionTypes.REMOVE_MESSAGE:
            _removeMessage(action.data);
            MessageStore.emitChange();
            break;
        default:
            // do nothing
    }

});

module.exports = MessageStore;
