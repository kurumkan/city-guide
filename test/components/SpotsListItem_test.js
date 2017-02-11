import { renderPlainComponent , expect } from '../test_helper';
import sinon from 'sinon';
import {SpotsListItem} from 'components/SpotsListItem';

describe('SpotsListItem', ()=>{
  var component;   

  beforeEach(() => {   
    var selectSpot, setMapCenter, changeVisitStatus = function(){};
    var spot = {
      visitors: [1, 2, 3],
      name: 'somename',
      location:{
        address: ['address1']
      }
    }        
    component = renderPlainComponent(SpotsListItem, {
      displayType: 'GRID',
      authenticated: true,
      selectSpot,
      setMapCenter,
      changeVisitStatus,
      spot
    });        
  });

  it('has a correct class', ()=>{
      expect(component).to.have.class('spots-list-item');
  });

  it('should display thumbnail', ()=>{
      expect(component.find('.thumbnail').length).to.equal(1);
      expect(component.find('.panel-body').length).to.equal(0);
  });

  it('should display panel', ()=>{
      var selectSpot, setMapCenter, changeVisitStatus = function(){};
      var spot = {
        visitors: [1, 2, 3],
        name: 'somename',
        location:{
          address: ['address1']
        }
      }        
      component = renderPlainComponent(SpotsListItem, {
        displayType: 'LIST',
        authenticated: true,
        selectSpot,
        setMapCenter,
        changeVisitStatus,
        spot
      });         
      expect(component.find('.thumbnail').length).to.equal(0);
      expect(component.find('.panel-body').length).to.equal(1);
  });  
  
  it('should display correct number of visitors', ()=>{      
    expect(component.find('.btn-go')).to.contain('3 going');
  });

  it('should display .glyphicon-plus', ()=>{      
    expect(component.find('.glyphicon-plus').length).to.equal(1);
    expect(component.find('.glyphicon-ok').length).to.equal(0);
  });

  it('should display .glyphicon-ok', ()=>{      
    localStorage.setItem('userid', '2');    
    var selectSpot, setMapCenter, changeVisitStatus = function(){};
    var spot = {
      visitors: ['1', '2', '3'],
      name: 'somename',
      location:{
        address: ['address1']
      }
    }        
    component = renderPlainComponent(SpotsListItem, {
      displayType: 'GRID',
      authenticated: true,
      selectSpot,
      setMapCenter,
      changeVisitStatus,
      spot
    });      

    expect(component.find('.glyphicon-plus').length).to.equal(0);
    expect(component.find('.glyphicon-ok').length).to.equal(1);
  });

  it('.btn-go should not be disabled', ()=>{              
    expect(component.find('.btn-go').first()).not.to.be.disabled;
  });  

  it('.btn-go should be disabled', ()=>{              
    var selectSpot, setMapCenter, changeVisitStatus = function(){};
    var spot = {
      visitors: [1, 2, 3],
      name: 'somename',
      location:{
        address: ['address1']
      }
    }        
    component = renderPlainComponent(SpotsListItem, {
      displayType: 'GRID',
      authenticated: false,
      selectSpot,
      setMapCenter,
      changeVisitStatus,
      spot
    });        
    expect(component.find('.btn-go').first()).to.be.disabled;
  });  

  it('should call changeVisitStatus', ()=>{              
    var selectSpot = sinon.spy();
    var setMapCenter = sinon.spy();
    var changeVisitStatus = sinon.spy();

    var spot = {
      visitors: [1, 2, 3],
      name: 'somename',
      location:{
        address: ['address1']
      }
    }        
    component = renderPlainComponent(SpotsListItem, {
      displayType: 'GRID',
      authenticated: true,
      selectSpot,
      setMapCenter,
      changeVisitStatus,
      spot
    });        
    
    component.find('.btn-go').first().simulate('click');

    sinon.assert.notCalled(selectSpot);      
    sinon.assert.notCalled(setMapCenter);      
    sinon.assert.calledOnce(changeVisitStatus);      
  });  

  it('should call selectSpot & setMapCenter', ()=>{              
    var selectSpot = sinon.spy();
    var setMapCenter = sinon.spy();
    var changeVisitStatus = sinon.spy();

    var spot = {
      visitors: [1, 2, 3],
      name: 'somename',
      location:{
        address: ['address1'],
        coordinate: {
          latitude: 1,
          longitude:1
        }
      }
    }        
    component = renderPlainComponent(SpotsListItem, {
      displayType: 'GRID',
      authenticated: true,
      selectSpot,
      setMapCenter,
      changeVisitStatus,
      spot
    });        
    
    component.find('.btn-go').last().simulate('click');

    sinon.assert.calledOnce(selectSpot);      
    sinon.assert.calledOnce(setMapCenter);      
    sinon.assert.notCalled(changeVisitStatus);      
  });        
 
});

