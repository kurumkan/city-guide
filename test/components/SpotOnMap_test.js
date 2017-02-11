import { renderPlainComponent , expect } from '../test_helper';
import sinon from 'sinon';
import {SpotOnMap} from 'components/SpotOnMap';

describe('SpotOnMap', ()=>{
  var component;    

  it('has a correct class', ()=>{
    var selectSpot = function(){};
    component = renderPlainComponent(SpotOnMap, {selectedId: 'someid', selectSpot, text:'sometext', id: 'anotherid'});         
    expect(component).to.have.class('spot-on-map');
  });

  it('should have class selected-spot', ()=>{
    var selectSpot = function(){};
    component = renderPlainComponent(SpotOnMap, {selectedId: 'someid', selectSpot, text:'sometext', id: 'someid'});         
    expect(component.find('.selected-spot').length).to.equal(1);
  });

  it('should not have class selected-spot', ()=>{
    var selectSpot = function(){};
    component = renderPlainComponent(SpotOnMap, {selectedId: 'someid', selectSpot, text:'sometext', id: 'anotherid'});         
    expect(component.find('.selected-spot').length).to.equal(0);
  });

  it('should render provided text', ()=>{
    var selectSpot = function(){};
    component = renderPlainComponent(SpotOnMap, {selectedId: 'someid', selectSpot, text:'sometext', id: 'someid'});         
    expect(component.find('.selected-spot').html()).to.equal('sometext');
  });

  it('should call selectSpot', ()=>{
    var selectSpot = sinon.spy();
    component = renderPlainComponent(SpotOnMap, {selectedId: 'someid', selectSpot, text:'sometext', id: 'someid'});         
    component.simulate('mouseEnter');                           
    sinon.assert.calledOnce(selectSpot);      
  });
});

