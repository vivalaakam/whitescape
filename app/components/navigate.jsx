var React = require('react');
var Link = require('react-router').Link;

var Navigate = React.createClass({
    getInitialState: function () {
        return {
            open: false,
        };
    },
    _toggle: function () {
        this.setState({
            open: !this.state.open
        });
    },
    render: function () {
        var open = this.state.open ? "leftmenu-nav leftmenu-open" : "leftmenu-nav";
        var icon = this.state.open ? <span className="icon-back"/> : <span className="icon-menu"/>;
        return (
            <div className="leftmenu">
                <button className="leftmenu__toggler" onClick={this._toggle}>
                    {icon}
                </button>
                <nav className={open}>
                    <Link className="icon-lists" to="/messages">
                        My messages
                    </Link>
                    <Link className="icon-settings" to="/settings">
                        Settings
                    </Link>

                    <Link to="/signout" className="icon-logout">
                      {this.props.user.first_name} {this.props.user.last_name}
                    </Link>
                </nav>
            </div>
        );
    }
});

module.exports = Navigate;
