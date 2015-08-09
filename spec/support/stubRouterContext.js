import objectAssign from 'object-assign';
import React from 'react';

const stubRouterContext = (Component, props, stubs) => {
  function RouterStub() { }

  assign(RouterStub, {
    makePath () {},
    makeHref () {},
    transitionTo () {},
    replaceWith () {},
    goBack () {},
    getCurrentPath () {},
    getCurrentRoutes () {},
    getCurrentPathname () {},
    getCurrentParams () {},
    getCurrentQuery () {},
    isActive () {},
    getRouteAtDepth() {},
    setRouteComponentAtDepth() {},
  }, stubs);

  return React.createClass({
    childContextTypes: {
      router: React.PropTypes.func,
      routeDepth: React.PropTypes.number,
    },

    getChildContext () {
      return {
        router: RouterStub,
        routeDepth: 0,
      };
    },

    render () {
      return <Component {...props} />;
    },
  });
};


export default stubRouterContext;
