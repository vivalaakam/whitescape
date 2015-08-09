jest.dontMock('../signup.jsx');
jest.dontMock('object-assign');
jest.dontMock('../../../spec/support/stubRouterContext.js');

import React from 'react/addons';
import Signup from '../signup.jsx';
import ReactRouterContext from '../../../spec/support/stubRouterContext.js';
import Actions from "../../actions/actions";
import ErrorStore from '../../stores/errors';

describe('signup', function() {

    var TestUtils = React.addons.TestUtils;

    var SignupR = ReactRouterContext(Signup , {ref: "child"});

    var user = {
      email : "test@test",
      password: "password",
      firstName: "andrey",
      lastName : "makarov"
    };

    it('should exists', function() {
        var signup = TestUtils.renderIntoDocument( <SignupR /> );
        expect(TestUtils.isCompositeComponent(signup)).toBeDefined();
    });

    it('submit form' , function () {
        var signup = TestUtils.renderIntoDocument( <SignupR /> );
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
        var signup = TestUtils.renderIntoDocument( <SignupR /> );
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
