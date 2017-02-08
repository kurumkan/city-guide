import { renderComponent , expect } from '../test_helper';
import Main from '../../src/components/Main';

describe('Main' , () => {
	var component;

	beforeEach(() => {
		component = renderComponent(Main);
	});

	it('renders something', () => {
		expect(component).to.exist;
	});
});
