import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducer from './reducers';

export default async function storeFactory({ initialState, sagaMiddleware, history }, ext = {}) {
  const middleware = applyMiddleware(routerMiddleware(history), sagaMiddleware);
  const enhancer = compose(middleware);
  return createStore(reducer(ext), initialState, enhancer);
}
