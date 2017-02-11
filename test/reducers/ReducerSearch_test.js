import { expect } from '../test_helper';
import reducerSearch from '../../frontend/src/reducers/ReducerSearch';

describe('reducerSearch', ()=> {	
	var state;

	beforeEach(() => {
		state = {
			term: 'London',
			location: {lat:  51.509865, lng: -0.118092},  
			sort: 0,
			offset:0
		};	
	});


	it('handles actions with unknown types', ()=>{			
		var action = {type: 'RANDOM_TYPE', payload: null};
		expect(reducerSearch(state, action)).to.eql(state);
	});

	it('SET_TERM', ()=>{			
		var action = {type: 'SET_TERM', payload: 'Beijing'};
		expect(reducerSearch(state, action)).to.eql({...state, term: action.payload});
	});

	it('SET_MAP_CENTER', ()=>{			
		var action = {type: 'SET_MAP_CENTER', payload: {lat:  80, lng: -80}};
		expect(reducerSearch(state, action)).to.eql({...state, location: action.payload});
	});

	it('SET_SORT', ()=>{			
		var action = {type: 'SET_SORT', payload: 2};
		expect(reducerSearch(state, action)).to.eql({...state, sort: action.payload});
	});

	it('SET_OFFSET', ()=>{			
		var action = {type: 'SET_OFFSET', payload: 2};
		expect(reducerSearch(state, action)).to.eql({...state, offset: action.payload});
	});

})
