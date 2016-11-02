import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TopbarWidget from '../components/Topbar';

const state = ({ auth }) => ({ auth });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({}, dispatch),
  dispatch
});

const Topbar = ({ actions, auth, title }) => (
  <TopbarWidget {...{ actions, auth, title }} />
);

Topbar.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  title: PropTypes.string
};

export default connect(state, actionsDispatch)(Topbar);
