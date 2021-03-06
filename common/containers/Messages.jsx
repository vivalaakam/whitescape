import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Topbar from './Topbar';
import MessagesWidget from '../components/Messages';
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

function Messages({ messages: { list, form, params }, actions }) {
  return (
    <span>
      <Topbar title="My messages" />
      <MessagesWidget {...{ list, form, params, actions }} />
    </span>
  );
}
Messages.propTypes = {
  actions: PropTypes.object.isRequired,
  messages: PropTypes.object
};

Messages.onEnter = ({ store, callback }) => {
  store.dispatch(fetchMessages());
  callback();
};

export default connect(state, actionsDispatch)(Messages);
