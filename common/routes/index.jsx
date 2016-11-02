import React, { PropTypes } from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import Auth from '../containers/Auth';
import Signup from '../containers/Signup';
import Messages from '../containers/Messages';
import Settings from '../containers/Settings';
import Restricted from '../containers/Restricted';

export default function Routes({ store, first }) {
  function w(loader) {
    return (nextState, replaceState, callback) => {
      if (first.time) {
        first.time = false;
        return callback();
      }
      return loader ? loader({ store, nextState, replaceState, callback }) : callback();
    };
  }

  function c(prevState, nextState, replace, callback) {
    first.time = false;
    return callback();
  }

  return (
    <Route path="/" component={App} onChange={c}>
      <Route path="/auth" component={Auth} />
      <Route path="/signup" component={Signup} />
      <Route component={Restricted}>
        <IndexRoute component={Messages} onEnter={w(Messages.onEnter)} />
        <Route path="/settings" component={Settings} />
      </Route>
    </Route>
  );
}

Routes.propTypes = {
  store: PropTypes.object.isRequired,
  first: PropTypes.bool
};
