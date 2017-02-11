import { expect } from '../test_helper';
import loaderReducer from '../../frontend/src/reducers/ReducerLoader';

describe('ReducerLoader', ()=> {	
	var state;

	beforeEach(() => {
		state = false;	
	});


	it('handles actions with unknown types', ()=>{			
		var action = {type: 'RANDOM_TYPE', payload: null};
		expect(loaderReducer(state, action)).to.equal(state);
	});

	it('CHANGE_LOADING_STATUS', ()=>{
		var action = {type: 'CHANGE_LOADING_STATUS'};
		expect(loaderReducer(state, action)).to.eql(!state);
	});
})
