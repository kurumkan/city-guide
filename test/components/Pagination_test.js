import { renderPlainComponent , expect } from '../test_helper';
import sinon from 'sinon';
import {Pagination} from 'components/Pagination';

describe('Pagination', ()=>{
  var component;   

  beforeEach(() => {        
    var getSpots = function(){};    
    component = renderPlainComponent(Pagination, 
      {term: 'london', sort:2, offset:0, spotsCount:100, getSpots});               
  });

  it('has a correct class', ()=>{
    expect(component).to.have.class('pagination-wrapper');
  });

  it('should have correct pageNumber', ()=>{
    expect(component.find('.pagination-info')).to.contain('Page 1 of 9');        
  });
  it('should have correct number of li-s', ()=>{    
    expect(component.find('li').length).to.equal(7);    
  });
  it("prev button should have class disabled, next button shouldn't", ()=>{    
    expect(component.find('li').first()).to.have.class('disabled');
    expect(component.find('li').last()).not.to.have.class('disabled');
  });  

  it("should call getSpots", ()=>{    
    var getSpots = sinon.spy();    
    component = renderPlainComponent(Pagination, 
        {term: 'london', sort:2, offset:0, spotsCount:100, getSpots});             
    component.find('li').last().simulate('click');
    sinon.assert.calledOnce(getSpots);      
  }); 

  it("should not call getSpots", ()=>{    
    var getSpots = sinon.spy();    
    component = renderPlainComponent(Pagination, 
        {term: 'london', sort:2, offset:0, spotsCount:1, getSpots});             
    component.find('li').last().simulate('click');
    sinon.assert.notCalled(getSpots);      
  }); 
  
  it("should set active class to the current page li", ()=>{    
    var getSpots = function(){};    
    component = renderPlainComponent(Pagination, 
        {term: 'london', sort:2, offset:15, spotsCount:80, getSpots});             
    expect(component.find('li').eq(2)).to.have.class('active');    
    expect(component.find('li').eq(1)).not.to.have.class('active');    
  });     
});

