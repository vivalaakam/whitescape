import React from 'react';
import actions from '../actions/actions';
import SessionStore from '../stores/session';
import ErrorStore from '../stores/errors';
import {Link} from 'react-router';

export default class Signup extends React.Component {
  constructor(props) {
      super(props);
      this._submit = this._submit.bind(this);
      this._onChange = this._onChange.bind(this);
      this._onSubmit = this._onSubmit.bind(this);
      this._onError = this._onError.bind(this);
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
      this.transitionTo('messages');
  }

  _onError() {
      this.setState({
          errors: ErrorStore.getErrors()
      });
  }

  _submit(e) {
      e.preventDefault();
      var firstName = this.refs.firstName.getDOMNode().value;
      var lastName = this.refs.lastName.getDOMNode().value;
      var email = this.refs.email.getDOMNode().value;
      var password = this.refs.password.getDOMNode().value;
      var self = this;
      actions.signup(email, password, lastName, firstName);

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
          <div className="signup__errors">
              <ul>{this.renderError()}</ul>
          </div>
      ) : (
          <div className="signup__submit">
              <button className="btn">Create accout</button>
          </div>
      );

      return (
          <div className="signup">
              <div className="signup__exists">
                  <span>Already have an account
                  </span>
                  <Link to="/">
                      Sign In
                  </Link>
              </div>
              <form onSubmit={this._submit}>
                  <div className="input icon-name">
                      <input className="inp" onChange={this._onChange} placeholder="First name" ref="firstName" type="text"/>
                  </div>
                  <div className="input icon-name">
                      <input className="inp" onChange={this._onChange} placeholder="Last name" ref="lastName" type="text"/>
                  </div>
                  <div className="input icon-email">
                      <input className="inp" onChange={this._onChange} placeholder="Email" ref="email" type="text"/>
                  </div>
                  <div className="input icon-password">
                      <input className="inp" onChange={this._onChange} placeholder="Password" ref="password" type="password"/>
                  </div>
                  {nav}
              </form>
          </div>
      );
  }
  
}
