import { combineReducers } from 'redux';
import list from './list';
import params from './params';
import form from './form';

export default combineReducers({
  params, list, form
});
