import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Back from '../Back/index';
import { Inp, Btn } from '../UI';
import style from './Settings.scss';

export default class Settings extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  onFirstName() {
    this.props.actions.updateAuth({
      firstName: this.refFirstName.value
    });
  }

  onLastName() {
    this.props.actions.updateAuth({
      lastName: this.refLastName.value
    });
  }

  submitSignup() {
    this.props.actions.saveAuth();
  }

  render() {
    const submitClassName = classnames(style.btn, style.submit);
    const { auth } = this.props;
    return (
      <Back>
        <div className={style.Settings}>
          <div className={classnames(style.row, style.person)}>
            <Inp
              className={style.inp}
              type="text"
              link={c => (this.refFirstName = c)}
              value={auth.firstName}
              onChange={::this.onFirstName}
              placeholder="First Name"
            />
          </div>
          <div className={classnames(style.row, style.person)}>
            <Inp
              className={style.inp}
              type="text"
              link={c => (this.refLastName = c)}
              value={auth.lastName}
              onChange={::this.onLastName}
              placeholder="Last Name"
            />
          </div>
          <div className={style.row}>
            <Btn className={submitClassName} onClick={::this.submitSignup}>Save</Btn>
          </div>
        </div>
      </Back>
    );
  }
}
