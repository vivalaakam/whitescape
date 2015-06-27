var React = require('react');
var Header = require('./header.jsx');
var MessageForm = require('./messageForm.jsx');
var MessageStore = require('../stores/message');
var actions = require('../actions/actions');
var Message = require('./message.jsx');

var Messages = React.createClass({
    getInitialState: function () {
        return {
            messages: []
        };
    },
    componentDidMount: function () {
        MessageStore.addChangeListener(this._onChange);
        actions.loadMessages();
    },
    _onChange: function () {
        this.setState({
            messages: MessageStore.getMessages(),
            next: MessageStore.getNext()
        });
    },
    _loadMore: function () {
        if (this.state.next) {
            actions.loadMessages(this.state.next);
        }
    },
    render: function () {
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
});
module.exports = Messages;
