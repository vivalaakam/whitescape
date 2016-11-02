import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import AppWidget from '../components/App';

const App = ({ children }) => (
  <div className="todoapp">
    <AppWidget>
      {children}
    </AppWidget>
    <Modal />
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default connect(state => state)(App);
