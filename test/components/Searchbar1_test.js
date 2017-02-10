import { renderPlainComponent , expect } from '../test_helper';

import sinon from 'sinon';

import {Searchbar} from 'components/Searchbar';

describe('Searchbar1', ()=>{
  it('when submitted, clear call getSpots', (done)=>{          
    var getSpots = sinon.spy();
    var component = renderPlainComponent(Searchbar, {getSpots, term: 'london', sort:0});         
    
    component.find('input').simulate('change', 'sitka');                  
    component.simulate('submit');
    
    sinon.assert.calledOnce(getSpots);
    
    expect(component.find('input')).to.have.value('');          

    done();     
  });
});

