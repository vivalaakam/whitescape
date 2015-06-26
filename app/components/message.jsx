var React = require('react');

var Message = React.createClass({
    render: function () {
        return (
            <div className="message">
                <div className="message__time">
                    <span className="icon-time"></span>
                    <span>{this.props.message.created}</span></div>
                <div className="message__body">{this.props.message.text}</div>
            </div>
        );
    }
});

module.exports = Message;
