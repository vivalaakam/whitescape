var React = require('react');
var Header = require('./header.jsx');

var Messages = React.createClass({
    render: function () {
        return (
            <div className="messages">
                <Header page="Messages"/>
                <div className="container"></div>
            </div>
        );
    }
});
module.exports = Messages;
