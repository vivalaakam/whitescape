import React from 'react';
import MessageForm from './messageForm.jsx';
import Header from './header.jsx';

export default class MessageNew extends React.Component {

  render() {
    return (
        <div className="newmessage background">
            <Header icon="icon-edit" page="New message"/>
            <MessageForm />
        </div>
    );
  }
  
}
