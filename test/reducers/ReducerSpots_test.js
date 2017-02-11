import { expect } from '../test_helper';
import reducerSpots from '../../frontend/src/reducers/ReducerSpots';

describe('ReducerSpots', ()=> {	
	var state;

	beforeEach(() => {
		state = {
			all: [{name: '1'}, {name: '2'}],
			selectedSpot: {name: '2'},
			spotsCount: 80 
		};	
	});

	it('handles actions with unknown types', ()=>{			
		var action = {type: 'RANDOM_TYPE', payload: null};
		expect(reducerSpots(state, action)).to.equal(state);
	});

	it('GET_SPOTS', ()=>{
		var action = {type: 'GET_SPOTS', payload: [{name:'100'}, {name:'200'}]};
		expect(reducerSpots(state, action)).to.eql({...state, all: action.payload});
	});

	it('SELECT_SPOT', ()=>{
		var action = {type: 'SELECT_SPOT', payload: 'someid'};
		expect(reducerSpots(state, action)).to.eql({...state, selectedSpot: action.payload});
	});

	it('SET_SPOTS_COUNT', ()=>{
		var action = {type: 'SET_SPOTS_COUNT', payload: 11};
		expect(reducerSpots(state, action)).to.eql({...state, spotsCount : 11});
	});

})
