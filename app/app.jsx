import React from 'react';
import Router from 'react-router';
import router from './router';

router.run(function (Handler) {
  React.render(<Handler />, document.getElementById('main'));
});
