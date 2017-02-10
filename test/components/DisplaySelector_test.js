import { renderPlainComponent , expect } from '../test_helper';
import sinon from 'sinon';
import {DisplaySelector} from 'components/DisplaySelector';

describe('DisplaySelector', ()=>{
  var component;   

  beforeEach(() => {        
    component = renderPlainComponent(DisplaySelector, {term: 'london', sort:2, displayType: 'GRID'});         
  });

  it('has a correct class', ()=>{
      expect(component).to.have.class('display-selector');
  });
    
  it('has 2 buttons and select element', ()=>{
      expect(component.find('.selector-button').length).to.equal(2);
      expect(component.find('select').length).to.equal(1);
  });

  it('sort and displayType should affect view', ()=>{
      expect(component.find('.glyphicon-th').parent()).to.have.class('active');
      expect(component.find('.glyphicon-th-list').parent()).not.to.have.class('active');
      expect(component.find('select').val()).to.equal('2');
  });

  describe('permorming events',()=>{        
    it('should call changeDisplayType', (done)=>{
      var getSpots = function(){};
      var setSort = function(){};
      var changeDisplayType = sinon.spy();
      var component = renderPlainComponent(DisplaySelector, {
        term: 'london', sort:2, displayType: 'GRID',
        getSpots, setSort, changeDisplayType
      });             
      component.find('.glyphicon-th-list').simulate('click');                        
      
      sinon.assert.calledOnce(changeDisplayType);      
      done();     
    });    

    it('should not call changeDisplayType', (done)=>{
      var getSpots = function(){};
      var setSort = function(){};
      var changeDisplayType = sinon.spy();
      var component = renderPlainComponent(DisplaySelector, {
        term: 'london', sort:2, displayType: 'GRID',
        getSpots, setSort, changeDisplayType
      });             
      component.find('.glyphicon-th').simulate('click');                        
      
      sinon.assert.notCalled(changeDisplayType);      
      done();     
    });    

    it('should call getSpots&setSort', (done)=>{
      var getSpots = sinon.spy();
      var setSort = sinon.spy();
      var changeDisplayType = sinon.spy();
      var component = renderPlainComponent(DisplaySelector, {
        term: 'london', sort:'0', displayType: 'GRID',
        getSpots, setSort, changeDisplayType
      });                   
      
      component.find('select').simulate('change', '2')         
      
      sinon.assert.calledOnce(getSpots);            
      sinon.assert.calledOnce(setSort);      
      sinon.assert.notCalled(changeDisplayType);   
      done();     
    });    

    it('should call not getSpots&setSort', (done)=>{
      var getSpots = sinon.spy();
      var setSort = sinon.spy();
      var changeDisplayType = sinon.spy();
      var component = renderPlainComponent(DisplaySelector, {
        term: 'london', sort:'0', displayType: 'GRID',
        getSpots, setSort, changeDisplayType
      });                   
      
      component.find('select').simulate('change', '0')         
      
      sinon.assert.notCalled(getSpots);            
      sinon.assert.notCalled(setSort);      
      sinon.assert.notCalled(changeDisplayType);   
      done();     
    });    
  }); 
});

