import React from 'react';
import actions from '../actions/actions';
import SessionStore from '../stores/session';
import Header from './header.jsx';

export default class Signup extends React.Component {

  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this._submit = this._submit.bind(this);
  }

  componentDidMount () {
      SessionStore.addChangeListener(this._onSubmit);
  }

  _onSubmit () {}

  _submit (e) {
      e.preventDefault();
      var firstName = this.refs.firstName.getDOMNode().value;
      var lastName = this.refs.lastName.getDOMNode().value;
      var self = this;
      actions.updateProfile({
          first_name: firstName,
          last_name: lastName
      }).catch (function () {});

  }

  render () {
      return (
          <div className="background">
              <Header page="Settings" icon="icon-settings"/>
              <div className="update">
                  <form onSubmit={this._submit}>
                      <input className="inp" placeholder="First name" ref="firstName" type="text"/>
                      <input className="inp" placeholder="Last name" ref="lastName" type="text"/>
                      <button className="btn">Save</button>
                  </form>
              </div>
          </div>
      );
  }
  
}
