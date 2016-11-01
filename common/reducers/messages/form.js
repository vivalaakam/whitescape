import { createAction } from 'redux-actions';
import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { clone } from '../../helpers/ramda';

const UPDATE_MESSAGE = Symbol('UPDATE_MESSAGE');
const RESET_MESSAGE = Symbol('RESET_MESSAGE');
const SET_MESSAGE = Symbol('SET_MESSAGE');


const $$initialState = {
  message: '',
  disabled: false
};

export default function filter($$state = $$initialState, { type, payload }) {
  switch (type) {
    case UPDATE_MESSAGE:
      return payload;
    case RESET_MESSAGE:
      return clone($$initialState);
    default:
      return $$state;
  }
}

const setMessage = createAction(SET_MESSAGE);
const updateMessage = createAction(UPDATE_MESSAGE);
const resetForm = createAction(RESET_MESSAGE);

function* setMessageAction({ payload }) {
  yield put(updateMessage({ message: payload || '', disabled: payload.length > 140 }));
}

export function* watchSetMessage() {
  yield* takeEvery(SET_MESSAGE, setMessageAction);
}

export { setMessage, resetForm };
