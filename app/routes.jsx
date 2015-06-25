var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var App = require('./components/app.jsx');
var Signup = require('./components/signup.jsx');
var Signin = require('./components/signin.jsx');
var Signout = require('./components/signout.jsx');
var Messages = require('./components/messages.jsx');

var routes = (
        <Route handler={App} path="/">
            <Route handler={Signin} name="main" path="/"/>
            <Route handler={Signup} name="signup" path="/signup"/>
            <Route handler={Signout} name="signout" path="/signout"/>
            <Route handler={Messages} name="messages" path="/messages"/>
        </Route>
);
module.exports = routes;