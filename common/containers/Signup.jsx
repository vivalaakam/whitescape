import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signup, errorAuth } from '../reducers/auth';
import SignupWidget from '../components/Signup';

const state = ({ auth }) => ({ auth });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({ signup, errorAuth }, dispatch),
  dispatch
});

function Signup({ actions, auth }) {
  return <SignupWidget {...{ actions, auth }} />;
}

Signup.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(state, actionsDispatch)(Signup);
