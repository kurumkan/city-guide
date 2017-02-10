import { renderComponent , expect } from '../test_helper';
import sinon from 'sinon';
import {IndexPage} from 'components/IndexPage';

describe('IndexPage', ()=>{
  var component;   

  it('has a correct class', ()=>{
    var authUser = function(){};
    var location = {
      query: {
        token: 1,
        username: 'john',        
        userid: 10
      }
    }
    component = renderComponent(IndexPage, {location, authUser}, {spots: []});         
    expect(component).to.have.class('index-page');
  });

  it('should call authUser', ()=>{
    var authUser = sinon.spy();
    var location = {
      query: {
        token: 1,
        username: 'john',        
        userid: 10
      }
    }
    component = renderComponent(IndexPage, {location, authUser}, {spots: []});         
    sinon.assert.calledOnce(authUser);      
  });

  it('should not call authUser', ()=>{
    var authUser = sinon.spy();
    var location = {
      query: {
        token: 1,
        username: undefined,        
        userid: 10
      }
    }
    component = renderComponent(IndexPage, {location, authUser}, {spots: []});         
    sinon.assert.notCalled(authUser);      
  });

});

