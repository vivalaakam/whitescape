import React from 'react';
import actions from '../actions/actions';
import SessionStore from '../stores/session';
import router from '../router';


export default class Signout extends React.Component {

    constructor(props) {
      super(props);
      this._onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount () {
        SessionStore.addChangeListener(this._onSubmit);
        actions.logout();
    }

    _onSubmit  () {
        if (!SessionStore.isLoggedIn()) {
            router.transitionTo('main');
        }
    }

    render () {
        return (
            <div>Signout</div>
        );
    }
    
}
