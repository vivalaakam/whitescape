import React from 'react';
import actions from '../actions/actions';

export default class MessageForm extends React.Component {
  
  constructor(props) {
      super(props);
      this._onKeyup = this._onKeyup.bind(this);
      this._onSubmit = this._onSubmit.bind(this);
      this.state ={
          totlal: null,
          err: false
      };
  }

  _onKeyup() {
      var len = this.refs.message.getDOMNode().value.length;
      this.setState({
          total: len,
          err: len > 140 ? true : false
      });
  }
  _onSubmit(e) {
      e.preventDefault();
      var message = this.refs.message.getDOMNode();
      if (message.value.length < 140) {
          actions.addMessage(message.value).then(function() {
              message.value = "";
          });
      }
  }

  render() {
      var sclass = this.state.err ? "messageForm-span error" : "messageForm-span";
      var total = this.state.total > 0 ? <span className={sclass}>{this.state.total}</span>   : null;
      return (
          <div className="messageForm">
              <form className="messageForm-form" onSubmit={this._onSubmit}>
                  <textarea className="messageForm-textarea" onKeyUp={this._onKeyup} ref="message" resize="none"></textarea>
                  <button className="messageForm-button" disabled={this.state.err}>
                      <span className="icon-submit"></span>
                  </button>
                  {total}
              </form>
          </div>
      );
  }

}
