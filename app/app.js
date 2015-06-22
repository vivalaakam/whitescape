var React = require('react');
var Router = require('react-router');
var Routes = require('./routes');

Router.run(Routes, Router.HistoryLocation, function (Handler, state) {
	  	React.render(<Handler />, document.getElementById('main'));
	});
