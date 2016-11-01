import { put, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { createAction } from 'redux-actions';
import { resetForm } from './form';
import { setLastTime, setLoadMore } from './params';
import { prepend, removeByKey, replace, concat } from '../../helpers/ramda';
import Messages from '../../api/messages';

const apiMessages = new Messages();

const MESSAGE_DELETE = Symbol('MESSAGE_DELETE');
const MESSAGE_DESTROY = Symbol('MESSAGE_DESTROY');
const MESSAGE_CREATE = Symbol('MESSAGE_CREATE');
const MESSAGE_UPDATE = Symbol('MESSAGE_UPDATE');
const MESSAGE_RESET = Symbol('MESSAGE_RESET');
const MESSAGE_ADD = Symbol('MESSAGE_ADD');
const MESSAGES_FETCH = Symbol('MESSAGES_FETCH');
const MESSAGES_RESET = Symbol('MESSAGES_RESET');

const $$initialState = [];

export default function list($$state = $$initialState, { type, payload }) {
  switch (type) {
    case MESSAGE_ADD:
      return prepend($$state, payload);
    case MESSAGE_DESTROY:
      return removeByKey($$state, payload);
    case MESSAGE_RESET:
      return replace($$state, [payload]);
    case MESSAGES_RESET:
      return concat($$state, payload);
    default:
      return $$state;
  }
}

const createMessage = createAction(MESSAGE_CREATE);

const addMessage = createAction(MESSAGE_ADD);

const updateMessage = createAction(MESSAGE_UPDATE);

const deleteMessage = createAction(MESSAGE_DELETE);

const destroyMessage = createAction(MESSAGE_DESTROY);

const resetMessage = createAction(MESSAGE_RESET);

const fetchMessages = createAction(MESSAGES_FETCH);

const resetMessages = createAction(MESSAGES_RESET);

function* createMessageAction({ payload }) {
  const message = yield apiMessages.create(payload);
  yield put(addMessage(message));
  yield put(resetForm());
}

function* updateMessageAction({ payload: { id, text = '' } }) {
  const message = yield apiMessages.update(id, { text });
  yield put(resetMessage(message));
}

function* deleteMessageAction({ payload: { id } }) {
  yield apiMessages.remove(id);
  yield put(destroyMessage(id));
}

function fetchParams(state) {
  return state.messages.params;
}

function* fetchMessagesAction() {
  const params = yield select(fetchParams);
  const messagesList = yield apiMessages.all(params);
  yield put(resetMessages(messagesList));
  if (messagesList.length === params.perPage) {
    yield put(setLastTime(messagesList[params.perPage - 1].created_at));
  } else {
    yield put(setLoadMore(false));
  }
}

export function* watchCreateMessage() {
  yield* takeEvery(MESSAGE_CREATE, createMessageAction);
}

export function* watchUpdateMessage() {
  yield* takeEvery(MESSAGE_UPDATE, updateMessageAction);
}

export function* watchFetchMessages() {
  yield* takeEvery(MESSAGES_FETCH, fetchMessagesAction);
}

export function* watchDeleteMessage() {
  yield* takeEvery(MESSAGE_DELETE, deleteMessageAction);
}

export {
  createMessage, fetchMessages, updateMessage, deleteMessage
};
