import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import Back from '../Back/Back';
import Inp from '../UI/Inp/Inp';
import Btn from '../UI/Btn/Btn';
import style from './Auth.scss';

export default class Auth extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  onEmail() {
    const { actions } = this.props;
    this.refEmail.classList.remove(style.error);
    if (this.refEmail.value === '') {
      actions.errorAuth('Field email can`t be blank');
      this.refEmail.classList.add(style.error);
      return false;
    }
    return true;
  }

  onPassword() {
    const { actions } = this.props;
    this.refPassword.classList.remove(style.error);
    if (this.refPassword.value === '') {
      actions.errorAuth('Field password can`t be blank');
      this.refPassword.classList.add(style.error);
      return false;
    }
    return true;
  }

  submitAuth() {
    const { actions } = this.props;

    if (!this.onEmail()) {
      return;
    }

    if (!this.onPassword()) {
      return;
    }

    actions.authentificate({ username: this.refEmail.value, password: this.refPassword.value });
  }


  render() {
    const submitClassName = classnames(style.btn, style.submit, {
      [style.error]: !!this.props.auth.error
    });
    const submitName = this.props.auth.error || 'Login';
    return (
      <Back>
        <div className={style.Auth}>
          <div className={style.logo} />
          <div className={classnames(style.row, style.email)}>
            <Inp
              className={style.inp}
              type="email"
              link={c => (this.refEmail = c)}
              onChange={::this.onEmail}
              placeholder="Email"
            />
          </div>
          <div className={classnames(style.row, style.password)}>
            <Inp
              className={style.inp}
              type="password"
              link={c => (this.refPassword = c)}
              onChange={::this.onPassword}
              placeholder="Password"
            />
          </div>
          <div className={style.row}>
            <Btn
              className={submitClassName}
              onClick={::this.submitAuth}
              disabled={!!this.props.auth.error}
            >{submitName}</Btn>
          </div>
          <Link className={style.signup} to="/signup">Create Account</Link>
        </div>
      </Back>
    );
  }
}
