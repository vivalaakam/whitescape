import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessagesWidget from '../components/Messages/Messages';
import { showModal } from '../reducers/modal';
import {
  fetchMessages,
  updateMessage,
  deleteMessage,
  createMessage
} from '../reducers/messages/list';
import { setMessage } from '../reducers/messages/form';

const state = ({ messages }) => ({ messages });

const actionsDispatch = dispatch => ({
  actions: bindActionCreators({
    createMessage,
    updateMessage,
    deleteMessage,
    fetchMessages,
    setMessage,
    showModal
  }, dispatch),
  dispatch
});

const Messages = ({ messages: { list, form, params }, actions }) => (
  <MessagesWidget {...{ list, form, params, actions }} />
);

Messages.propTypes = {
  actions: PropTypes.object.isRequired,
  messages: PropTypes.object
};

Messages.onEnter = ({ store, callback }) => {
  store.dispatch(fetchMessages());
  callback();
};

export default connect(state, actionsDispatch)(Messages);
