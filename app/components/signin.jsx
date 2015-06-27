var React = require('react');
var actions = require('../actions/actions');
var Link = require('react-router').Link;
var SessionStore = require('../stores/session');
var Router = require('react-router');

var Signin = React.createClass({
    mixins: [Router.Navigation],
    statics: {
        willTransitionTo: function (transition) {
            if (SessionStore.isLoggedIn()) {
                transition.redirect("/messages");
            }
        }
    },
    getInitialState: function () {
        return {
            errors: []
        };
    },
    componentDidMount: function () {
        SessionStore.addChangeListener(this._onSubmit);
    },
    _onSubmit: function () {
        this.transitionTo('messages');
    },
    _submit: function (e) {
        e.preventDefault();
        var email = this.refs.email.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        var self = this;
        actions.login({
            email: email,
            password: password
        }). catch (function (data) {

            var errors = [];

            for (var key in data) {
                errors = errors.concat(data[key]);
            }
            self.setState({
                errors: errors
            });
        });

    },
    _reset: function () {
        this.setState({
            errors: []
        });
    },
    renderError: function () {
        return this.state.errors.map(function (error) {
            return <li>{error}</li>;
        });
    },
    render: function () {
        var errors = this.state.errors.length ? (
                <div className="error">
                    <ul>{this.renderError()}</ul>
                </div>
        ) : null;

        return (
            <div className="login">
                <div className="login__logo">
                    <img className="login__logo-img" src="/images/logo.png"/>
                </div>
                <form onSubmit={this._submit}>
                    <div className="input icon-email">
                        <input className="inp" onChange={this._reset} placeholder="Email" ref="email" type="text"/>
                    </div>
                    <div className="input icon-password">
                        <input className="inp" onChange={this._reset} placeholder="Password" ref="password" type="password"/>
                    </div>
                    <button className="btn">Sign in</button>
                    {errors}
                </form>
                <div className="login__create">
                    <Link className="login__create-a" to="/signup">Create account</Link>
                </div>
            </div>
        );
    }
});
module.exports = Signin;
