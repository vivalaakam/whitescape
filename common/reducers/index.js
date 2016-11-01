import { combineReducers } from 'redux';
import todos from './todos';
import messages from './messages';
import auth from './auth';
import main from './main';
import modal from './modal';

export default function (ext) {
  return combineReducers({ todos, messages, auth, main, modal, ...ext });
}
