/** @jsx React.DOM */
jest.dontMock('../signin.jsx');
jest.dontMock('object-assign');
jest.dontMock('../../../spec/support/stubRouterContext.js');
describe('Signin', function() {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Signin = require('../signin.jsx');
    var ReactRouterContext = require('../../../spec/support/stubRouterContext.js');
    Signin = ReactRouterContext(Signin);

    it('should exists', function() {
        var signin = TestUtils.renderIntoDocument( <Signin /> );
        expect(TestUtils.isCompositeComponent(signin)).toBeDefined();
    });
});
