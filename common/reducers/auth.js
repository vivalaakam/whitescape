import { put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { takeEvery } from 'redux-saga';
import { createAction } from 'redux-actions';
import { merge } from '../helpers/ramda';
import Auth from '../api/auth';

const apiAuth = new Auth();

const AUTH_CURRENT = Symbol('AUTH_CURRENT');
const AUTH_UPDATE = Symbol('AUTH_UPDATE');
const AUTH_SAVE = Symbol('AUTH_SAVE');
const AUTH_ERROR = Symbol('AUTH_ERROR');
const AUTH_FETCH = Symbol('AUTH_FETCH');
const AUTH_AUTHENTIFICATE = Symbol('AUTH_AUTHENTIFICATE');
const AUTH_SIGNUP = Symbol('AUTH_SIGNUP');

const $$initialState = {};

export default function auth($$state = $$initialState, { type, payload }) {
  switch (type) {
    case AUTH_CURRENT:
      return payload;
    case AUTH_ERROR:
      return merge($$state, { error: payload });
    case AUTH_UPDATE:
      return merge($$state, payload);
    default:
      return $$state;
  }
}

const fetchAuth = createAction(AUTH_FETCH);

const currentAuth = createAction(AUTH_CURRENT);

const errorAuth = createAction(AUTH_ERROR);

const updateAuth = createAction(AUTH_UPDATE);

const saveAuth = createAction(AUTH_SAVE);

const authentificate = createAction(AUTH_AUTHENTIFICATE);

const signup = createAction(AUTH_SIGNUP);

function getUser(state) {
  return state.auth;
}

function* fetchAuthAction() {
  const authData = yield apiAuth.current();
  yield put(currentAuth(authData));
}

function* authentificateAction({ payload: { username, password } }) {
  try {
    const user = yield apiAuth.auth({ username, password });
    yield put(currentAuth(user));
    yield put(push('/'));
  } catch (e) {
    yield put(errorAuth(e.message));
  }
}

function* signupAction({ payload }) {
  try {
    const user = yield apiAuth.signup(payload);
    yield put(currentAuth(user));
    yield put(push('/'));
  } catch (e) {
    yield put(errorAuth(e.message));
  }
}

function* saveAuthAction() {
  try {
    const { firstName, lastName } = yield select(getUser);
    const user = yield apiAuth.updateCurrent({ firstName, lastName });
    yield put(currentAuth(user));
    yield put(push('/'));
  } catch (e) {
    yield put(errorAuth(e.message));
  }
}

export function* watchFetchAuth() {
  yield* takeEvery(AUTH_FETCH, fetchAuthAction);
}

export function* watchAuthentificate() {
  yield* takeEvery(AUTH_AUTHENTIFICATE, authentificateAction);
}

export function* watchSignup() {
  yield takeEvery(AUTH_SIGNUP, signupAction);
}

export function* watchSaveAuth() {
  yield takeEvery(AUTH_SAVE, saveAuthAction);
}

export {
  fetchAuth, saveAuth, updateAuth, signup, authentificate, errorAuth
};
