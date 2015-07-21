/** @jsx React.DOM */
jest.dontMock('../signup.jsx');
jest.dontMock('object-assign');
jest.dontMock('../../../spec/support/stubRouterContext.js');
describe('signup', function() {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Signup = require('../signup.jsx');
    var ReactRouterContext = require('../../../spec/support/stubRouterContext.js');
    var Actions = require("../../actions/actions");
    var ErrorStore = require('../../stores/errors');
    Signup = ReactRouterContext(Signup , {ref: "child"});

    var user = {
      email : "test@test",
      password: "password",
      firstName: "andrey",
      lastName : "makarov"
    };

    it('should exists', function() {
        var signup = TestUtils.renderIntoDocument( <Signup /> );
        expect(TestUtils.isCompositeComponent(signup)).toBeDefined();
    });

    it('submit form' , function () {
        var signup = TestUtils.renderIntoDocument( <Signup /> );
        signup.refs.child.refs.email.getDOMNode().value = user.email;
        signup.refs.child.refs.password.getDOMNode().value = user.password;
        signup.refs.child.refs.lastName.getDOMNode().value = user.lastName;
        signup.refs.child.refs.firstName.getDOMNode().value = user.firstName;
        Actions.signup = jest.genMockFunction();
      	var form = TestUtils.findRenderedDOMComponentWithTag(signup, 'form');
      	TestUtils.Simulate.submit(form.getDOMNode());
      	expect(Actions.signup).toBeCalledWith( user.email ,user.password , user.lastName , user.firstName);
    });

    it('show error' , function () {
        var signup = TestUtils.renderIntoDocument( <Signup /> );
        var err = { name : 'err' , value: 'show error' };

        expect(ErrorStore.addChangeListener.mock.calls.length).toBeGreaterThan(0);
      	ErrorStore._errors = [err];
	      ErrorStore.getErrors = jest.genMockFunction().mockImplementation(function(){
	         return [err];
        });
        ErrorStore.addChangeListener.mock.calls[2][0]();
      	var errElem = TestUtils.findRenderedDOMComponentWithClass(signup, 'signup__errors');
        expect(TestUtils.isCompositeComponent(errElem)).toBeDefined();
    });
});
