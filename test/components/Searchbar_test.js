import { renderPlainComponent , expect } from '../test_helper';
import sinon from 'sinon';
import {Searchbar} from 'components/Searchbar';

describe('Searchbar', ()=>{
  var component;   

  beforeEach(() => {        
    component = renderPlainComponent(Searchbar, {term: 'london', sort:0});         
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
    
    it('shows text that is entered', ()=>{      
      expect(component.find('input')).to.have.value('sitka'); 
    });

    it('when submitted, clear the input', (done)=>{
      var getSpots = function(){};
      var component = renderPlainComponent(Searchbar, {getSpots, term: 'london', sort:0});             
      component.find('input').simulate('change', 'sitka');                  
      component.simulate('submit');           
      
      expect(component.find('input')).to.have.value('');               
      
      done();     
    });

    it('when submitted non empty form, call getSpots', (done)=>{
      var getSpots = sinon.spy();
      var component = renderPlainComponent(Searchbar, {getSpots, term: 'london', sort:0});             
      component.find('input').simulate('change', 'sitka');                  
      component.simulate('submit');           
      
      sinon.assert.calledOnce(getSpots);      
      done();     
    });

    it('when submitted an empty form, should not call getSpots', (done)=>{
      var getSpots = sinon.spy();
      var component = renderPlainComponent(Searchbar, {getSpots, term: 'london', sort:0});             
      component.find('input').simulate('change', '');                  
      component.simulate('submit');           
      
      sinon.assert.notCalled(getSpots);      
      done();     
    });
  }); 
});

