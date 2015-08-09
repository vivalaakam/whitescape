import React from 'react';
import Router from 'react-router';
import router from './router';

import '../less/app.less';

router.run(function(Handler) {
    React.render(<Handler/>, document.getElementById('main'));
});
