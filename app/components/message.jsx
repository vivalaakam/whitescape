var React = require('react');
var actions = require('../actions/actions');
var Message = React.createClass({
    _onDelete: function (e) {
        e.preventDefault();
        actions.removeMessage(this.props.message);
    },
    render: function () {
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
});

module.exports = Message;
