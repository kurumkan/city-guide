import { expect } from '../test_helper';
import * as actions from '../../frontend/src/actions/Actions';
import * as router from 'react-router';

import sinon from 'sinon'
import axios from 'axios'

import nock from 'nock'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const mockStore = configureStore([thunk]);

describe('Actions', ()=> {
	describe('signinUser', ()=>{

		var {signinUser} = actions;
		var arg;

		beforeEach(() => {
			arg = {
				login: 'john',
				password: '123'
			}	
			localStorage.setItem('term', 'london')		
			localStorage.setItem('sort', 0)		
			localStorage.setItem('offset', 0)		
		});

		afterEach(function () {
	     	nock.cleanAll()
	    });

	    it('should call setErrorMessage', ()=>{		

			nock('http://localhost:80/auth/signin').post('', {...arg})				
				.reply(401)			

			var expectedActions = [
				{
					type: 'SET_ERROR',
					payload: 'Bad Login Info'
				}
			];

		    var store = mockStore({});
		    return store.dispatch(signinUser({...arg}))		    
		    	.then(()=>{		    		
		    		expect(store.getActions()).to.eql(expectedActions)
		    	})
		    
	    });    		


	    it('should call authUser', ()=>{		
	    	var username = 'john';
	    	var userid = 'someid';
	    	var token = 'sometoken';

			nock('http://localhost:80').post('/auth/signin', {...arg})				
				.reply(200, {username, userid, token})			

			var expectedActions = [
				{
					type: 'REMOVE_ERROR'
				},
				{
					type: 'AUTH_USER', 
					payload: {
						username,
						userid
					}
				},
				{
					type: 'REMOVE_ERROR'
				},
				{
					type: 'CHANGE_LOADING_STATUS'
				}
			];

		    var store = mockStore({});
		    return store.dispatch(signinUser({...arg}))		    
		    	.then(()=>{		    		
		    		expect(store.getActions()).to.eql(expectedActions)
		    	})		    
	    });    		
	});

	describe('signupUser', ()=>{

		var {signupUser} = actions;
		var arg;

		beforeEach(() => {
			arg = {
				username: 'john',
				email: 'john@mail.com',
				password: '123'
			}	
			localStorage.setItem('term', 'london')		
			localStorage.setItem('sort', 0)		
			localStorage.setItem('offset', 0)		
		});

		afterEach(function () {
	     	nock.cleanAll()
	    });

	    it('should call setErrorMessage', ()=>{		

			nock('http://localhost:80/auth/signup').post('', {...arg})				
				.reply(401)			

			var expectedActions = [
				{
					type: 'SET_ERROR',
					payload: 'This email or username is already in use'
				}
			];

		    var store = mockStore({});
		    return store.dispatch(signupUser({...arg}))		    
		    	.then(()=>{		    			    	
		    		expect(store.getActions()).to.eql(expectedActions)
		    	})
		    
	    });    		


	    it('should call authUser', ()=>{		
	    	var username = 'john';
	    	var userid = 'someid';
	    	var token = 'sometoken';

			nock('http://localhost:80').post('/auth/signup', {...arg})				
				.reply(200, {username, userid, token})			

			var expectedActions = [
				{
					type: 'REMOVE_ERROR'
				},
				{
					type: 'AUTH_USER', 
					payload: {
						username,
						userid
					}
				},
				{
					type: 'REMOVE_ERROR'
				},
				{
					type: 'CHANGE_LOADING_STATUS'
				}
			];

		    var store = mockStore({});
		    return store.dispatch(signupUser({...arg}))		    
		    	.then(()=>{		    		
		    		expect(store.getActions()).to.eql(expectedActions)
		    	})		    
	    });    		
	});

	describe('authUser', ()=>{			
		var {authUser} = actions;

	    it('should dispatch AUTH_USER & set localStorage items', ()=>{		
	    	var username = 'john';
			var token = 'sometoken';
			var userid = '123';		
				
			localStorage.setItem('term', 'moscow')		
			localStorage.setItem('sort', 2)		
			localStorage.setItem('offset', 100)	

			localStorage.setItem('token', 'oldtoken');
			localStorage.setItem('username', 'oldusername');
			localStorage.setItem('userid', 'olduserid')	

			var expectedActions = [			
				{
					type: 'REMOVE_ERROR'
				},
				{
					type: 'AUTH_USER', 
					payload: {
						username,
						userid
					}
				},
				{
					type: 'REMOVE_ERROR'
				},
				{
					type: 'CHANGE_LOADING_STATUS'
				}			
			];

		    var store = mockStore({});
		    store.dispatch(authUser(token, username, userid))		    
		   	expect(store.getActions()).to.eql(expectedActions)
		   	expect(localStorage.getItem('token')).to.equal(token)
		   	expect(localStorage.getItem('username')).to.equal(username)
		   	expect(localStorage.getItem('userid')).to.equal(userid)		    
	    });    		

	    it('should call browserHistory push method', ()=>{		
	    	var username = 'john';
			var token = 'sometoken';
			var userid = '123';					
			localStorage.removeItem('term');

			localStorage.setItem('token', 'oldtoken');
			localStorage.setItem('username', 'oldusername');
			localStorage.setItem('userid', 'olduserid')	

			var expectedActions = [			
				{
					type: 'REMOVE_ERROR'
				},
				{
					type: 'AUTH_USER', 
					payload: {
						username,
						userid
					}
				}				
			];
			router.browserHistory = { push: (path)=>{} };
			var browserHistoryPushStub = sinon.stub(router.browserHistory, 'push', (path) => {});

		    var store = mockStore({});		    
		    store.dispatch(authUser(token, username, userid))		    
		   	expect(store.getActions()).to.eql(expectedActions)		   			   	
		   	expect(browserHistoryPushStub.calledOnce).to.eql(true)

        	browserHistoryPushStub.restore();
	    });    				
	});

	it('signoutUser', ()=>{			
		var {signoutUser} = actions;
		var keys = ['token','username','userid','term','sort','offset'];
		keys.map((key)=>localStorage.setItem(key, 'somestring'))		
		router.browserHistory = { push: (path)=>{} };
		var browserHistoryPushStub = sinon.stub(router.browserHistory, 'push', (path) => {});

		var store = mockStore({});		    
		store.dispatch(signoutUser());
		keys.map((key)=>expect(localStorage.getItem(key)).to.eql(null))

		expect(browserHistoryPushStub.calledOnce).to.eql(true)

       	browserHistoryPushStub.restore();
	});

	it('selectSpot', ()=>{			
		var {selectSpot} = actions;
		var id = 'someid'
		expect(selectSpot(id).type).to.equal('SELECT_SPOT');
		expect(selectSpot(id).payload).to.equal(id);
	});

	it('setMapCenter', ()=>{			
		var {setMapCenter} = actions;
		var coords = {lat: 1, lng: 1}
		expect(setMapCenter(coords).type).to.equal('SET_MAP_CENTER');
		expect(setMapCenter(coords).payload).to.equal(coords);
	});

	it('setTerm', ()=>{			
		var {setTerm} = actions;
		var arg = 'london'
		expect(setTerm(arg).type).to.equal('SET_TERM');
		expect(setTerm(arg).payload).to.equal(arg);
	});

	it('setSort', ()=>{			
		var {setSort} = actions;
		var arg = 2
		expect(setSort(arg).type).to.equal('SET_SORT');
		expect(setSort(arg).payload).to.equal(arg);
	});

	it('setOffset', ()=>{			
		var {setOffset} = actions;
		var arg = 100
		expect(setOffset(arg).type).to.equal('SET_OFFSET');
		expect(setOffset(arg).payload).to.equal(arg);
	});

	it('changeLoadingStatus', ()=>{			
		var {changeLoadingStatus} = actions;		
		expect(changeLoadingStatus().type).to.equal('CHANGE_LOADING_STATUS');		
	});

	it('changeLoadingStatus', ()=>{			
		var {changeLoadingStatus} = actions;		
		expect(changeLoadingStatus().type).to.equal('CHANGE_LOADING_STATUS');		
	});

	it('changeDisplayType', ()=>{			
		var {changeDisplayType} = actions;		
		expect(changeDisplayType().type).to.equal('CHANGE_DISPLAY_TYPE');		
	});

	it('setErrorMessage', ()=>{			
		var {setErrorMessage} = actions;
		var arg = 'error message'
		expect(setErrorMessage(arg).type).to.equal('SET_ERROR');
		expect(setErrorMessage(arg).payload).to.equal(arg);
	});

	it('removeErroMessage', ()=>{			
		var {removeErroMessage} = actions;		
		expect(removeErroMessage().type).to.equal('REMOVE_ERROR');		
	});
	
})
