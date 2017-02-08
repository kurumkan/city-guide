import { renderComponent , expect } from '../test_helper';
import Loader from 'components/Loader';

describe('Loader' , () => {
	var component;	

	beforeEach(() => {		
		component = renderComponent(Loader);		
	});

	it('has a correct class', () => {
		expect(component).to.have.class('loader');
	});
});
