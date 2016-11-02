import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import Back from '../Back/index';
import { Inp, Btn } from '../UI';
import style from './Signup.scss';

export default class Signup extends Component {

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

  submitSignup() {
    const { actions } = this.props;

    if (!this.onEmail()) {
      return;
    }

    if (!this.onPassword()) {
      return;
    }

    actions.signup({
      username: this.refEmail.value,
      password: this.refPassword.value,
      firstName: this.refFirstName.value,
      lastName: this.refLastName.value
    });
  }

  render() {
    const submitClassName = classnames(style.btn, style.submit, {
      [style.error]: !!this.props.auth.error
    });
    const submitName = this.props.auth.error || 'Create account';

    return (
      <Back>
        <div className={style.Signup}>
          <div className={style.haveAccount}>
            Already have an account? <Link to="/auth">Sign In</Link>
          </div>
          <div className={classnames(style.row, style.person)}>
            <Inp
              className={style.inp}
              type="text"
              link={c => (this.refFirstName = c)}
              placeholder="First Name"
            />
          </div>
          <div className={classnames(style.row, style.person)}>
            <Inp
              className={style.inp}
              type="text"
              link={c => (this.refLastName = c)}
              placeholder="Last Name"
            />
          </div>
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
            <Btn className={submitClassName} onClick={::this.submitSignup}>{submitName}</Btn>
          </div>
        </div>
      </Back>
    );
  }
}
