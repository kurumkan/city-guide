import { expect } from '../test_helper';
import * as actions from '../../frontend/src/actions/Actions';

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
		});

		afterEach(function () {
	     	nock.cleanAll()
	    });

	    it('should call setErrorMessage', (done)=>{		

			nock('http://localhost:5000/auth/signin').post('')				
				.reply(401)			

			var expectedActions = [{
				type: 'SET_ERROR',
				payload: 'Bad Login Info'
			}];

		    var store = mockStore({}, expectedActions, done);
		    console.log(store.getState())
		    store.dispatch(signinUser({...arg}));
	    });    


		
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
