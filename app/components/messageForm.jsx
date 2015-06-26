var React = require('react');
var actions = require('../actions/actions');
var Messages = React.createClass({
    getInitialState: function () {
        return {
            totlal: null,
            err: false
        };
    },
    _onKeyup: function () {
        var len = this.refs.message.getDOMNode().value.length;
        this.setState({
            total: len,
            err: len > 140 ? true : false
        });
    },
    _onSubmit: function (e) {
        e.preventDefault();
        var message = this.refs.message.getDOMNode();
        if (message.value.length < 140) {
            actions.addMessage(message.value).then(function () {
                message.value = "";
            });
        }
    },
    render: function () {
        var sclass = this.state.err ? "messageForm-span error" : "messageForm-span";
        return (
            <div className="messageForm">
                <form className="messageForm-form" onSubmit={this._onSubmit}>
                    <textarea className="messageForm-textarea" onKeyUp={this._onKeyup} ref="message" resize="none"></textarea>
                    <button className="messageForm-button" disabled={this.state.err}>
                        <span className="icon-submit"></span>
                    </button>
                    <span className={sclass}>{this.state.total}</span>
                </form>
            </div>
        );
    }
});
module.exports = Messages;
