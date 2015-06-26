var React = require('react');
var Link = require('react-router').Link;
var SessionStore = require('../stores/session');
var Router = require('react-router');

var Header = React.createClass({
    getInitialState: function () {
        return {
            user: SessionStore.getData()
        };
    },
    render: function () {
        return (
            <div className="header">
                <div className="container">
                    <ul className="right nav">
                        <li className="name">
                            {this.state.user.first_name}
                                {this.state.user.last_name}
                        </li>
                        <li>
                            <Link to="/signout" className="logout">
                                <span className="icon-logout"></span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = Header;
