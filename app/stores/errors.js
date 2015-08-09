import { EventEmitter } from 'events';
import { ActionTypes } from '../constants/constants';
import AppDispatcher from '../dispatcher/dispatcher';
var CHANGE_EVENT = 'change';

class ErrorStore extends EventEmitter {
    constructor() {
        super();
        this._errors = [];
        this._dispatchToken = AppDispatcher.register(this.subscribe.bind(this));
    }

    subscribe(action) {
        switch (action.type) {
            case ActionTypes.ADD_ERROR:
                this._addError(action.error);
                this.emitChange();
                break;
            case ActionTypes.SET_ERRORS:
                this._setErrors(action.errors);
                this.emitChange();
                break;
            case ActionTypes.RESET_ERRORS:
                this._setErrors();
                this.emitChange();
                break;
            case ActionTypes.REMOVE_ERROR:
                this._removeError(action.data);
                this.emitChange();
                break;
            default:
        }
    }

    get dispatchToken() {
        return this._dispatchToken;
    }

    _addError(data) {
        this._errors.push(data);
    }

    _removeError(row) {
        this._errors = this._errors.filter(function(error) {
            return row.name !== error.name;
        });
    }
    _setErrors(data) {
        if (!data) {
            data = [];
        }
        this._errors = data;
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    getErrors() {
        return this._errors;
    }
}

export default new ErrorStore();
