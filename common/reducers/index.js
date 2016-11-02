import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import main from './main';
import modal from './modal';

export default function (ext) {
  return combineReducers({ messages, auth, main, modal, ...ext });
}
