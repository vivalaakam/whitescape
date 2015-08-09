import React from 'react';
import {RouteHandler} from 'react-router';

export default class Template extends React.Component {
  render() {
      return (
          <div className="content">
              <RouteHandler/>
          </div>
      );
  }
}
