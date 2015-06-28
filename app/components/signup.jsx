var React = require('react');
var actions = require('../actions/actions');
var Link = require('react-router').Link;
var SessionStore = require('../stores/session');
var ErrorStore = require('../stores/errors');

var Router = require('react-router');

var Signup = React.createClass({
    mixins: [Router.Navigation],
    componentDidMount: function() {
        SessionStore.addChangeListener(this._onSubmit);
        ErrorStore.addChangeListener(this._onError);
    },
    getInitialState: function() {
        return {
            errors: []
        };
    },
    componentWillUnmount: function() {
        SessionStore.removeChangeListener(this._onSubmit);
        ErrorStore.removeChangeListener(this._onError);
    },
    _onSubmit: function() {
        this.transitionTo('messages');
    },
    _onError: function() {
        this.setState({
            errors: ErrorStore.getErrors()
        });
    },
    _submit: function(e) {
        e.preventDefault();
        var firstName = this.refs.firstName.getDOMNode().value;
        var lastName = this.refs.lastName.getDOMNode().value;
        var email = this.refs.email.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        var self = this;
        actions.signup({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        });

    },
    _reset: function() {
        this.setState({
            errors: []
        });
    },
    renderError: function() {
        return this.state.errors.map(function(error) {
            return (
                <li>
                    {error.value}
                </li>
            );
        });
    },
    render: function() {
        var nav = this.state.errors.length ? (
            <div className="signup__errors">
                <ul>{this.renderError()}</ul>
            </div>
        ) : (
            <div className="signup__submit">
                <button className="btn">Create accout</button>
            </div>
        );

        return (
            <div className="signup">
                <div className="signup__exists">
                    <span>Already have an account
                    </span>
                    <Link to="/">
                        Sign In
                    </Link>
                </div>
                <form onSubmit={this._submit}>
                    <div className="input icon-name">
                        <input className="inp" onChange={this._reset} placeholder="First name" ref="firstName" type="text"/>
                    </div>
                    <div className="input icon-name">
                        <input className="inp" onChange={this._reset} placeholder="Last name" ref="lastName" type="text"/>
                    </div>
                    <div className="input icon-email">
                        <input className="inp" onChange={this._reset} placeholder="Email" ref="email" type="text"/>
                    </div>
                    <div className="input icon-password">
                        <input className="inp" onChange={this._reset} placeholder="Password" ref="password" type="password"/>
                    </div>
                    {nav}
                </form>
            </div>
        );
    }
});
module.exports = Signup;
