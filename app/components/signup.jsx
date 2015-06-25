var React = require('react');
var actions = require('../actions/actions');
var Link = require('react-router').Link;
var SessionStore = require('../stores/session');
var Router = require('react-router');

var Signup = React.createClass({
    mixins: [Router.Navigation],
    componentDidMount: function () {
        SessionStore.addChangeListener(this._onSubmit);

    },
    _onSubmit: function () {
        this.transitionTo('messages');
    },
    _submit: function (e) {
        e.preventDefault();
        var firstName = this.refs.firstName.getDOMNode().value;
        var lastName = this.refs.lastName.getDOMNode().value;
        var email = this.refs.email.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        var self = this;
        actions.signup({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }).catch(function() {

        });

    },
    render: function () {
        return (
            <div className="background">
                <div className="already_exists">
                    <span>Already have an account
                    </span>
                    <Link to="/">
                        Sign In
                    </Link>
                </div>
                <div className="signup">
                    <form onSubmit={this._submit}>
                        <input className="inp" placeholder="First name" ref="firstName" type="text"/>
                        <input className="inp" placeholder="Last name" ref="lastName" type="text"/>
                        <input className="inp" placeholder="Email" ref="email" type="text"/>
                        <input className="inp" placeholder="Password" ref="password" type="text"/>
                        <button className="btn">Create accout</button>
                    </form>
                </div>
            </div>
        );
    }
});
module.exports = Signup;
