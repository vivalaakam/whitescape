var React = require('react');
var actions = require('../actions/actions');
var SessionStore = require('../stores/session');
var ErrorStore = require('../stores/errors');
var Router = require('react-router');
var Link = Router.Link;

var Signin = React.createClass({
    mixins: [Router.Navigation],
    statics: {
        willTransitionTo: function(transition) {
            if (SessionStore.isLoggedIn()) {
                transition.redirect("/messages");
            }
        }
    },
    getInitialState: function() {
        return {
            errors: []
        };
    },
    componentDidMount: function() {
        SessionStore.addChangeListener(this._onSubmit);
        ErrorStore.addChangeListener(this._onError);
    },
    componentWillUnmount: function() {
        SessionStore.removeChangeListener(this._onSubmit);
        ErrorStore.removeChangeListener(this._onError);
    },
    _onSubmit: function() {
        this.transitionTo('messages');
    },
    _onError: function(data) {
        this.setState({
            errors: ErrorStore.getErrors()
        });
    },
    _submit: function(e) {
        e.preventDefault();
        var email = this.refs.email.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        var self = this;
        actions.login(email, password);
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
            <div className="login__errors">
                <ul>{this.renderError()}</ul>
            </div>
        ) : (
            <div className="login__submit">
                <button className="btn">Sign in</button>
            </div>
        );

        return (
            <div className="login">
                <div className="login__logo">
                    <img className="login__logo-img" src="/images/logo.png"/>
                </div>
                <form className="login__form" onSubmit={this._submit}>
                    <div className="input icon-email">
                        <input className="inp login__form-email" onChange={this._reset} placeholder="Email" ref="email" type="text"/>
                    </div>
                    <div className="input icon-password">
                        <input className="inp login__form-password" onChange={this._reset} placeholder="Password" ref="password" type="password"/>
                    </div>
                    {nav}
                </form>
                <div className="login__create">
                    <Link className="login__create-a" to="/signup">Create account</Link>
                </div>
            </div>
        );
    }
});
module.exports = Signin;
