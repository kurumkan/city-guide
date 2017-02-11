import { renderComponent , expect } from '../test_helper';
import sinon from 'sinon';
import {SpotsList} from 'components/SpotsList';

describe('SpotsList', ()=>{
  var component;   

  beforeEach(() => {     
    var spot =  {
      visitors: [1, 2, 3],
      name: 'somename',
      location:{
        address: ['address1']
      }
    };
    var spots = [spot, spot, spot];
    component = renderComponent(SpotsList, {spots,term: 'london', isLoading:false});         
  });

  it('has a correct class, render DisplaySelector & Pagination', ()=>{
    expect(component).to.have.class('spots-list');
    expect(component.find('.display-selector').length).to.equal(1);
    expect(component.find('.pagination-wrapper').length).to.equal(1);
    expect(component.find('h2')).to.contain('Search Results for: london');
  });

  it('should display all the provided spots', ()=>{    
    expect(component.find('.spots-list-item').length).to.equal(3);
  });

  it('should display loader', ()=>{    
    var spot =  {
      visitors: [1, 2, 3],
      name: 'somename',
      location:{
        address: ['address1']
      }
    };
    var spots = [spot, spot, spot];
    component = renderComponent(SpotsList, {spots,term: 'london', isLoading:true});      
    expect(component.find('.spots-list').length).to.equal(0);    
    expect(component).to.have.class('loader');
  });

  it('should display empty div', ()=>{    
    var spot =  {
      visitors: [1, 2, 3],
      name: 'somename',
      location:{
        address: ['address1']
      }
    };
    var spots = [spot, spot, spot];
    component = renderComponent(SpotsList, {spots,term: 'london', isLoading:false, error: 'error message'});      
    expect(component.html()).to.equal('');        
  });  
});

