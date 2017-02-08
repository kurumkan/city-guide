import { renderComponent , expect } from '../test_helper';
import Alert from 'components/Alert';

describe('Alert' , () => {
	var component;
	var error = 'error message text goes here';

	beforeEach(() => {		
		component = renderComponent(Alert, null,{error});		
	});

	it('has a correct class', () => {
		expect(component).to.have.class('alert');
	});

	it('shows error message', () => {		
		expect(component).to.contain(error);		
	});

	it('does not show error message', () => {		
		component = renderComponent(Alert);		
		expect(component.find('a').length).to.equal(0);		
	});
});
