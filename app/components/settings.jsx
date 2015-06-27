var React = require('react');
var actions = require('../actions/actions');
var Link = require('react-router').Link;
var SessionStore = require('../stores/session');
var Router = require('react-router');
var Header = require('./header.jsx');

var Signup = React.createClass({
    mixins: [Router.Navigation],
    componentDidMount: function () {
        SessionStore.addChangeListener(this._onSubmit);

    },
    _onSubmit: function () {},
    _submit: function (e) {
        e.preventDefault();
        var firstName = this.refs.firstName.getDOMNode().value;
        var lastName = this.refs.lastName.getDOMNode().value;
        var self = this;
        actions.updateProfile({
            first_name: firstName,
            last_name: lastName
        }). catch (function () {});

    },
    render: function () {
        return (
            <div className="background">
                <Header page="Settings" icon="icon-settings"/>
                <div className="update">
                    <form onSubmit={this._submit}>
                        <input className="inp" placeholder="First name" ref="firstName" type="text"/>
                        <input className="inp" placeholder="Last name" ref="lastName" type="text"/>
                        <button className="btn">Save</button>
                    </form>
                </div>
            </div>
        );
    }
});
module.exports = Signup;
