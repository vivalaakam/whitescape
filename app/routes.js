var React = require('react');
var Router = require('react-router');
var Routes = require('./routes');
var Route = Router.Route;

var App = require('./components/app');
var Signup = require('./components/signup');
var Signin = require('./components/signin');
var Signout = require('./components/signout');
var Messages = require('./components/messages');

var routes = (
  <Route path="/" handler={App}>
    <Route name="main" path="/" handler={Signin}/>
    <Route name="signup" path="/signup" handler={Signup}/>
    <Route name="signout" path="/signout" handler={Signout}/>
    <Route name="messages" path="/messages" handler={Messages}/>
  </Route>
);
  module.exports = routes;
