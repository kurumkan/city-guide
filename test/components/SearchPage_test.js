import { renderComponent , expect } from '../test_helper';
import sinon from 'sinon';
import {SearchPage} from 'components/SearchPage';

describe('SearchPage', ()=>{
  var component;   

  beforeEach(() => {
    var getSpots = function(){};
    var location = {
      query: {
        term: 'london', sort:2, offset:0
      }
    }        
    component = renderComponent(SearchPage, {getSpots, location});         
  });

  it('has a correct class', ()=>{        
    expect(component).to.have.class('search-page');
  }); 

  it('Should render MapContainer & SpotsList, should not render alert', ()=>{        
    expect(component.find('.map-container').length).to.equal(1);
    expect(component.find('.spots-list').length).to.equal(1);
    expect(component.find('.alert').length).to.equal(0);
  }); 
});

