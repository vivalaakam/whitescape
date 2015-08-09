jest.dontMock('../signin.jsx');
jest.dontMock('object-assign');
jest.dontMock('../../../spec/support/stubRouterContext.js');


    import React from 'react/addons';
    import Signin from '../signin.jsx';
    import ReactRouterContext from '../../../spec/support/stubRouterContext.js';
    import Actions from "../../actions/actions";
    import ErrorStore from '../../stores/errors';

describe('Signin', function() {
    var TestUtils = React.addons.TestUtils;
    var SigninR = ReactRouterContext(Signin , {ref: "child"});

    var user = {
      email : "test@test",
      password: "password"
    };

    it('should exists', function() {
        var signin = TestUtils.renderIntoDocument( <SigninR /> );
        expect(TestUtils.isCompositeComponent(signin)).toBeDefined();
    });

    it('submit form' , function () {
        var signin = TestUtils.renderIntoDocument( <SigninR /> );
        var emailInput = signin.refs.child.refs.email;
      	var passInput = signin.refs.child.refs.password;
        emailInput.getDOMNode().value = user.email;
        passInput.getDOMNode().value = user.password;
        Actions.login = jest.genMockFunction();
      	var form = TestUtils.findRenderedDOMComponentWithTag(signin, 'form');
      	TestUtils.Simulate.submit(form.getDOMNode());
      	expect(Actions.login).toBeCalledWith( user.email ,user.password);
    });

    it('show error' , function () {
        var signin = TestUtils.renderIntoDocument( <SigninR /> );
        var err = { name : 'err' , value: 'show error' };

        expect(ErrorStore.addChangeListener.mock.calls.length).toBeGreaterThan(0);
      	ErrorStore._errors = [err];
	      ErrorStore.getErrors = jest.genMockFunction().mockImplementation(function(){
	         return [err];
        });
        ErrorStore.addChangeListener.mock.calls[2][0]();
      	var errElem = TestUtils.findRenderedDOMComponentWithClass(signin, 'login__errors');
        expect(TestUtils.isCompositeComponent(errElem)).toBeDefined();
    });
});
