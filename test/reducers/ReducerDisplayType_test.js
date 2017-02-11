import { expect } from '../test_helper';
import reducerDisplayType from '../../frontend/src/reducers/ReducerDisplayType';

describe('ReducerDisplayType', ()=> {	
	var state;

	beforeEach(() => {
		state = 'LIST'
	});

	it('handles actions with unknown types', ()=>{			
		var action = {type: 'RANDOM_TYPE'};
		expect(reducerDisplayType(state, action)).to.equal(state);
	});	

	it('CHANGE_DISPLAY_TYPE', ()=>{			
		var action = {type: 'CHANGE_DISPLAY_TYPE'};
		expect(reducerDisplayType(state, action)).to.equal('GRID');
	});	
})
