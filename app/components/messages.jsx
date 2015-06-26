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
            messages: MessageStore.getMessages()
        });
    },
    render: function () {
        var messages = this.state.messages.map(function (message) {
            return <Message message={message}/>;
        });

        return (
            <div className="messages">
                <Header page="Messages"/>
                <div className="container">
                    <MessageForm />
                    <div className="messages__list">
                        {messages}
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = Messages;
