var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = require('../constants/constants').ActionTypes;
var AppDispatcher = require('../dispatcher/dispatcher');
var CHANGE_EVENT = 'change';
var errors = [];


function _addError(data) {
    errors.push(data);
}

function _setErrors(data) {
    if (!data) {
        data = [];
    }

    errors = data;
}

function _removeError(row) {
    errors = errors.filter(function(error) {
        return row.name !== error.name;
    });
}

var ErrorStore = assign({}, EventEmitter.prototype, {
    _errors: [],
    _addError: function(data) {
        this._errors.push(data);
    },
    _removeError: function(row) {
        this._errors = this._errors.filter(function(error) {
            return row.name !== error.name;
        });
    },
    _setErrors: function(data) {
        if (!data) {
            data = [];
        }
        this._errors = data;
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    getErrors: function() {
        return this._errors;
    },
});

ErrorStore.dispatchToken = AppDispatcher.register(function(action) {

    switch (action.type) {
        case ActionTypes.ADD_ERROR:
            ErrorStore._addError(action.error);
            ErrorStore.emitChange();
            break;
        case ActionTypes.SET_ERRORS:
            ErrorStore._setErrors(action.errors);
            ErrorStore.emitChange();
            break;
        case ActionTypes.RESET_ERRORS:
            ErrorStore._setErrors();
            ErrorStore.emitChange();
            break;
        case ActionTypes.REMOVE_ERROR:
            ErrorStore._removeError(action.data);
            ErrorStore.emitChange();
            break;
        default:
    }

});

module.exports = ErrorStore;
