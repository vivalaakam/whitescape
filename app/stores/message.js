import { EventEmitter } from 'events';
import { ActionTypes } from '../constants/constants';
import AppDispatcher from '../dispatcher/dispatcher';
var CHANGE_EVENT = 'change';

class MessageStore extends EventEmitter {

    constructor() {
        super();
        this._messages = [];
        this._message_ids = [];
        this._next = [];
        this._dispatchToken = AppDispatcher.register(this.subscribe.bind(this));
    }

    subscribe(action) {
      console.log(action);
        switch (action.type) {
            case ActionTypes.ADD_MESSAGE:
                this._addMessage(action.data);
                this.emitChange();
                break;
            case ActionTypes.LOAD_MESSAGES:
                console.log(1);
                this._loadMessages(action.data.results);
                console.log(2);
                this._nextPage(action.data.next);
                console.log(3);
                this.emitChange();
                break;
            case ActionTypes.REMOVE_MESSAGE:
                this._removeMessage(action.data);
                this.emitChange();
                break;
            default:
        }
    }

    get dispatchToken() {
        return this._dispatchToken;
    }

    _nextPage(url) { 
      console.log(url);
        if (url) {
            var re = /\?page=(\d+)/;
            var page = re.exec(url);
            this._next = page[1];
        } else {
            this._next = false;
        }
        console.log(url , this._next);
    }


    _addMessage(data, rev) {
      console.log(1 , data);
        if (rev) {
            this._messages.push(data);
            this._message_ids.push(data.id);
        } else {
            this._messages.unshift(data);
            this._message_ids.unshift(data.id);
        }
    }

    _loadMessages(resp) {
        resp.forEach(function(message) {
            if (this._message_ids.indexOf(message.id) === -1) {
                this._addMessage(message, true);
            }
        } , this);
        console.log(this._messages);
    }

    _removeMessage(data) {
        var index = this._messages.indexOf(data);
        if (index > -1) {
            this._messages.splice(index, 1);
        }
    }

    emitChange() {
      console.log('emit');
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    getMessages() {
        return this._messages;
    }

    getMessage(index) {
        if (!index) {
            index = 0;
        }
        return this._messages[index];
    }

    getNext() {
        return this._next;
    }
}

export default new MessageStore();
