import { createAction } from 'redux-actions';
import { merge } from '../../helpers/ramda';

const SET_LAST_TIME = Symbol('SET_LAST_TIME');
const SET_LOAD_MORE = Symbol('SET_LOAD_MORE');

const $$initialState = {
  loadMore: true, perPage: 10, lastTime: ''
};

export default function filter($$state = $$initialState, { type, payload }) {
  switch (type) {
    case SET_LAST_TIME:
      return merge($$state, { page: payload });
    case SET_LOAD_MORE:
      return merge($$state, { loadMore: payload });
    default:
      return $$state;
  }
}

const setLastTime = createAction(SET_LAST_TIME);
const setLoadMore = createAction(SET_LOAD_MORE);

export { setLastTime, setLoadMore };
