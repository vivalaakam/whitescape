import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import modal from './modal';

export default function (ext) {
  return combineReducers({ messages, auth, modal, ...ext });
}
