import React from 'react';
import {Link} from 'react-router';

export default class Navigate extends React.Component {

  constructor(props) {
    super(props);
    this._toggle = this._toggle.bind(this);
    this.state = {
      open: false
    };
  }

  _toggle () {
      this.setState({
          open: !this.state.open
      });
  }

  render () {
      var open = this.state.open ? "leftmenu-nav leftmenu-open" : "leftmenu-nav";
      var icon = this.state.open ? <span className="icon-back"/> : <span className="icon-menu"/>;
      return (
          <div className="leftmenu">
              <button className="leftmenu__toggler" onClick={this._toggle}>
                  {icon}
              </button>
              <nav className={open}>
                  <Link className="icon-lists" to="/messages">
                      My messages
                  </Link>
                  <Link className="icon-edit" to="/create">
                      New message
                  </Link>
                  <Link className="icon-settings" to="/settings">
                      Settings
                  </Link>
                  <Link className="icon-logout" to="/signout">
                      {this.props.user.first_name}
                          {this.props.user.last_name}
                  </Link>
              </nav>
          </div>
      );
  }
  
}
