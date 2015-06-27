var React = require('react');
var MessageForm = require('./messageForm.jsx');
var Header = require('./header.jsx');

var NewMessage = React.createClass({
    render: function () {
        return (
            <div className="newmessage background">
                <Header icon="icon-edit" page="New message"/>
                <MessageForm />
            </div>
        );
    }
});

module.exports = NewMessage;
