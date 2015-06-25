var React = require('react');
var Link = require('react-router').Link;

var Signin = React.createClass({
    render: function () {
        return (
            <div className="background">
                <Link to="/signup">Signup</Link>
            </div>
        );
    }
});
module.exports = Signin;
