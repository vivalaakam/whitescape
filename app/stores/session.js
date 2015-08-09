import { EventEmitter } from 'events';
import { ActionTypes } from '../constants/constants';
import AppDispatcher from '../dispatcher/dispatcher';
var CHANGE_EVENT = 'change';

class SessionStore extends EventEmitter {

    constructor() {
        super();
        this._session = {};
        this._dispatchToken = AppDispatcher.register(this.subscribe.bind(this));
        this._restoreSession();
    }

    subscribe(action) {
        switch (action.type) {
            case ActionTypes.SIGNUP:
            case ActionTypes.LOGIN:
                this._setSession(action.data);
                this.emitChange();
                break;
            case ActionTypes.LOGOUT:
                this._clearSession();
                this.emitChange();
                break;
            case ActionTypes.UPDATE_PROFILE:
                this._updateSession(action.data);
                this.emitChange();
                break;
            default:
        }
    }

    get dispatchToken() {
        return this._dispatchToken;
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

    getData() {
        return this._session.profile;
    }
    getToken() {
        return this._session.token;
    }

    isLoggedIn() {
        return this._session && this._session.token;
    }


    _setSession(data) {
        this._session = data;
        try {
            localStorage.setItem('session', JSON.stringify(this._session));
        } catch (exception) {}
    }

    _updateSession(data) {
        this._session.profile = data;
        try {
            localStorage.setItem('session', JSON.stringify(this._session));
        } catch (exception) {}
    }

    _restoreSession() {
        try {
            this._session = JSON.parse(localStorage.getItem('session'));
        } catch (exception) {
            this._session = {};
        }
    }

    _clearSession() {
        this._session = {};
        try {
            localStorage.setItem('session', JSON.stringify({}));
        } catch (exception) {}
    }

}

export default new SessionStore();
