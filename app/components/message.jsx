import React from 'react';
import actions from '../actions/actions';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this._onDelete = this._onDelete.bind(this);
  }
  _onDelete (e) {
      e.preventDefault();
      actions.removeMessage(this.props.message);
  }

  render () {
      return (
          <div className="message">
              <div className="message__time">
                  <span className="icon-time"></span>
                  <span>{this.props.message.created}</span></div>
              <div className="message__body">{this.props.message.text}</div>
              <button className="message__delete-button" onClick={this._onDelete}>
                  <span className="icon-delete"></span>
              </button>
          </div>
      );
  }
}
