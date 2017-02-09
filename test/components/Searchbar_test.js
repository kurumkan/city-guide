import { renderComponent , expect } from '../test_helper';
import sinon from 'sinon';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

import Searchbar from 'components/Searchbar';

describe('Searchbar', ()=>{
	var component;	

	beforeEach(() => {		
		var search = {
			term: 'london',
			sort:0
		}
		component = renderComponent(Searchbar, null,{search});		 
	});

	it('has a correct class', ()=>{
	    expect(component).to.have.class('searchbar');
	});

		
	it('has a text input and button', ()=>{
	    expect(component.find('input')).to.exist;
	    expect(component.find('button')).to.exist;
	});

	describe('enter some text',()=>{		
		beforeEach(()=>{
			component.find('input').simulate('change', 'sitka');						
		});		

	    afterEach(function () {	      
	     	mockAxios.reset();
	    })

		it('shows text that is entered', ()=>{			
			expect(component.find('input')).to.have.value('sitka');	
		});

		it('when submitted, clear the input', (done)=>{
			mockAxios.onGet('/api/spots').reply(200, {});			
			component.simulate('submit');
			
			expect(component.find('input')).to.have.value('');
			done();			
		});

		it('when submitted, call getSpots', (done)=>{
			mockAxios.onGet('/api/spots').reply(200, {});			
			component.simulate('submit');
						
			expect(component.find('input')).to.have.value('');
			done();			
		});
	});	
});

