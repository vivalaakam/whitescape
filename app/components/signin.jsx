import React from 'react';
import actions from '../actions/actions';
import SessionStore from '../stores/session';
import ErrorStore from '../stores/errors';
import {Link} from  'react-router';
import router from '../router';

export default class Signin extends React.Component {

    static willTransitionTo(transition) {
      if (SessionStore.isLoggedIn()) {
          transition.redirect("/messages");
      }
    }

    constructor(props) {
      super(props);
      this._onSubmit = this._onSubmit.bind(this);
      this._onError = this._onError.bind(this);
      this._onChange = this._onChange.bind(this);
      this._submit = this._submit.bind(this);
      this.state = {
        errors: []
      };
    }

    componentDidMount() {
        SessionStore.addChangeListener(this._onSubmit);
        ErrorStore.addChangeListener(this._onError);
    }

    componentWillUnmount() {
        SessionStore.removeChangeListener(this._onSubmit);
        ErrorStore.removeChangeListener(this._onError);
    }

    _onSubmit() {
        router.transitionTo('messages');
    }

    _onError(data) {
        this.setState({
            errors: ErrorStore.getErrors()
        });
    }

    _submit(e) {
        e.preventDefault();
        var email = this.refs.email.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        var self = this;
        actions.login(email, password);
    }

    _onChange() {
        this.setState({
            errors: []
        });
    }

    renderError() {
        return this.state.errors.map(function(error) {
            return (
                <li>
                    {error.value}
                </li>
            );
        });
    }
    
    render() {
        var nav = this.state.errors.length ? (
            <div className="login__errors">
                <ul>{this.renderError()}</ul>
            </div>
        ) : (
            <div className="login__submit">
                <button className="btn">Sign in</button>
            </div>
        );

        return (
            <div className="login">
                <div className="login__logo">
                    <img className="login__logo-img" src="/images/logo.png"/>
                </div>
                <form className="login__form" onSubmit={this._submit}>
                    <div className="input icon-email">
                        <input className="inp login__form-email" onChange={this._onChange} placeholder="Email" ref="email" type="text"/>
                    </div>
                    <div className="input icon-password">
                        <input className="inp login__form-password" onChange={this._onChange} placeholder="Password" ref="password" type="password"/>
                    </div>
                    {nav}
                </form>
                <div className="login__create">
                    <Link className="login__create-a" to="/signup">Create account</Link>
                </div>
            </div>
        );
    }

}
