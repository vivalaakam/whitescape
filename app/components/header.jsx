import React from 'react';
import {Link} from 'react-router';
import SessionStore from '../stores/session';
import Navigate from './navigate.jsx';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this.state = {
      user : SessionStore.getData()
    };
  }
  componentDidMount () {
      SessionStore.addChangeListener(this._onChange);
  }
  _onChange () {
      this.setState({
          user: SessionStore.getData()
      });
  }
  render () {
      return (
          <div className="header">
              <div className="container">
                  <ul className="right nav">
                      <li className="name">
                          {this.state.user.first_name}
                          {this.state.user.last_name}
                      </li>
                      <li>
                          <Link to="/settings">
                              <span className="icon-settings"></span>
                          </Link>
                      </li>
                      <li>
                          <Link className="logout" to="/signout">
                              <span className="icon-logout"></span>
                          </Link>
                      </li>
                  </ul>
                  <ul className="nav">
                      <li>
                          <Navigate user={this.state.user}/>
                      </li>
                      <li>{this.props.page}</li>
                  </ul>
              </div>
          </div>
      );
  }
}
