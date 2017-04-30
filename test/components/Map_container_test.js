import { renderComponent , expect } from '../test_helper';
import sinon from 'sinon';
import {MapContainer} from 'components/MapContainer';

describe('MapContainer', ()=>{
  var component;

  beforeEach(() => {
    var spots = [{location: {coordinate: {latitude:1, longitude: 1}}}, {location: {coordinate: {latitude:1, longitude: 1}}}];
    var center = {};
    var error=undefined;

    component = renderComponent(MapContainer, {spots, center, error}, {spots});
  });

  it('has a correct class', ()=>{
    expect(component).to.have.class('map-container');
  });

  it('should render SpotOnMap for each spot', ()=>{
    expect(component.find('.spot-on-map').length).to.equal(2);
  });


  it('should render map', ()=>{
    var spots = [{location: {coordinate: {latitude:1, longitude: 1}}}];
    var center = {};
    var error=undefined;
    component = renderComponent(MapContainer, {spots, center, error}, {spots});

    expect(component.find('.spot-on-map').length).not.to.equal(0);
  });

  it('should be empty', ()=>{
    var spots = [{location: {coordinate: {latitude:1, longitude: 1}}}];
    var center = {};
    var error='some error message';
    component = renderComponent(MapContainer, {spots, center, error}, {spots});

    expect(component.html()).to.equal('');
  });


});

