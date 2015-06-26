var React = require('react');
var actions = require('../actions/actions');
var Link = require('react-router').Link;
var SessionStore = require('../stores/session');
var Router = require('react-router');

var Signout = React.createClass({
    mixins: [Router.Navigation],
    componentDidMount: function () {
        SessionStore.addChangeListener(this._onSubmit);
        actions.logout();
    },
    _onSubmit: function () {
        if (!SessionStore.isLoggedIn()) {
            this.transitionTo('main');
        }
    },
    render: function () {
        return (
            <div>Signout</div>
        );
    }
});
module.exports = Signout;
