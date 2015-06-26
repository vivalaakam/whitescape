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
    componentDidMount: function () {
        SessionStore.addChangeListener(this._onChange);
    },
    _onChange: function () {
        this.setState({
            user: SessionStore.getData()
        });
    },
    render: function () {
        return (
            <div className="header">
                <div className="container">
                    <span>{this.props.page}</span>
                    <ul className="right nav">
                        <li className="name">
                            {this.state.user.first_name}
                                {this.state.user.last_name}
                        </li>
                        <li>
                            <Link to="/settings">
                                <span className="icon-settings"></span>
                            </Link>
                        </li>
                        <li>
                            <Link className="logout" to="/signout">
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
