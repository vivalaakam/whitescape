import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

const style = require('./Topbar.scss');


export default class Topbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    title: PropTypes.string
  };

  links() {
    const { auth } = this.props;
    if (auth && auth.id) {
      return (
        <div className={style.auth}>
          <span className={style.name}>{auth.firstName} {auth.lastName}</span>
          <a className={classnames(style.link, style.logout)} href="/api/auth/logout">&nbsp;</a>
        </div>
      );
    }

    return (
      <div className={style.auth}>
        <Link className={style.link} to="/auth">Auth</Link>
      </div>
    );
  }

  render() {
    const { title } = this.props;
    return (
      <div className={style.Topbar}>
        <div className={style.title}>
          {title}
        </div>
        {this.links()}
      </div>
    );
  }
}
