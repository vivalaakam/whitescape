import React from 'react';
import Router from 'react-router';

const {
    Route
} = Router;

import App from './components/app.jsx';
import Signup from './components/signup.jsx';
import Signin from './components/signin.jsx';
import Signout from './components/signout.jsx';
import Messages from './components/messages.jsx';
import Settings from './components/settings.jsx';
import NewMessage from './components/messageNew.jsx';

export default (
    <Route handler={App} path="/">
        <Route  handler={Signin} name="main" path="/"/>
        <Route  handler={Signup} name="signup" path="/signup"/>
        <Route  handler={Signout} name="signout" path="/signout"/>
        <Route  handler={Messages} name="messages" path="/messages"/>
        <Route  handler={Settings} name="settings" path="/settings"/>
        <Route  handler={NewMessage} name="newmessage" path="/create"/>
    </Route>
);
