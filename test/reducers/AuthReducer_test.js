import { expect } from '../test_helper';
import authReducer from '../../frontend/src/reducers/AuthReducer';

describe('AuthReducer', ()=> {	
	var state;

	beforeEach(() => {
		state = {
			authenticated: false, 
			username: 'John', 
			userid: '123'
		};	
	});


	it('handles actions with unknown types', ()=>{			
		var action = {type: 'RANDOM_TYPE', payload: null};
		expect(authReducer(state, action)).to.equal(state);
	});

	it('UNAUTH_USER', ()=>{
		var action = {type: 'UNAUTH_USER'};
		expect(authReducer(state, action)).to.eql({authenticated: false, username: '', userid: null});
	});

	it('AUTH_USER', ()=>{
		var action = {type: 'AUTH_USER', payload: {username: 'Alex', userid: '321'}};
		expect(authReducer(state, action)).to.eql({authenticated: true, username: 'Alex', userid: '321'});
	});
})
