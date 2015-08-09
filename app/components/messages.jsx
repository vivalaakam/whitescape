import React from 'react';
import Header from './header.jsx';
import MessageForm from'./messageForm.jsx';
import MessageStore from '../stores/message';
import actions from '../actions/actions';
import Message from './message.jsx';

export default class Messages extends React.Component {

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this._loadMore = this._loadMore.bind(this);
    this.state = {
      messages: []
    };
  }

  componentDidMount () {
      MessageStore.addChangeListener(this._onChange);
      actions.loadMessages();
  }

  _onChange () {
      this.setState({
          messages: MessageStore.getMessages(),
          next: MessageStore.getNext()
      });

      console.log(MessageStore.getMessages());
  }

  _loadMore () {
      if (this.state.next) {
          actions.loadMessages(this.state.next);
      }
  }

  render () {
      var messages = this.state.messages.map(function (message) {
          return <Message message={message}/>;
      });

      var next_page = this.state.next ? (
              <div className="messages__load">
                  <button className="messages__load-button" onClick={this._loadMore}>
                      <span className="icon-scroll"></span>
                  </button>
              </div>
      ) : null;

      return (
          <div className="messages">
              <Header page="Messages" icon="icon-lists"/>
              <div className="container">
                  <MessageForm />
                  <div className="messages__list">
                      {messages}
                  </div>
                      {next_page}
              </div>
          </div>
      );
  }

}
