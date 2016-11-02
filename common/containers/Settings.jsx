import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateAuth, saveAuth, errorAuth } from '../reducers/auth';
import Topbar from './Topbar';
import SettingsWidget from '../components/Settings';

const state = ({ auth }) => ({ auth });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({ updateAuth, saveAuth, errorAuth }, dispatch),
  dispatch
});

function Settings({ actions, auth }) {
  return (
    <span>
      <Topbar title="Settings" />
      <SettingsWidget {...{ actions, auth }} />
    </span>
  );
}

Settings.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(state, actionsDispatch)(Settings);
