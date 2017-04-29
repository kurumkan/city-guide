import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";
import shouldPureComponentUpdate from "react-pure-render/function";
import GoogleMap from "google-map-react";

import SpotOnMap from "components/SpotOnMap";
const API_KEY = "AIzaSyBnOUUxJEsZI_9aQ3-yIF22MTbysMsEFVw";

export class MapContainer extends Component {
  static defaultProps = { zoom: 14 };

  constructor( props ) {
    super( props );
    this.state = { center: null };
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  componentWillReceiveProps( nextProps ) {
    var { center } = nextProps;
    this.setState( { center } );
  }  
  createMapOptions( maps ) {
    return {
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_LEFT
      },
      mapTypeControl: true,
      StreetViewPanorama: true
    }
  }

  _onChildClick = ( key, childProps ) => {
    var center = { lat: childProps.lat, lng: childProps.lng };
    this.setState( { center } );
  }

  renderSpots() {
    return this.props.spots.map(( spot ) => {
      const { latitude, longitude } = spot.location.coordinate;
      const { name, id } = spot;
      return <SpotOnMap text={ name } id={ id } key={ id } lat={ latitude } lng={ longitude } />
    });
  }

  render() {
    const { error, zoom } = this.props;
    const { center } = this.state;

    if ( error ) {
      return <div className="map-container" />;
    } else {
      return (
        <div className="map-container">
          <GoogleMap
            center={ center }
            zoom={ zoom }
            bootstrapURLKeys={{ key: API_KEY }}
            options={ this.createMapOptions }
            onChildClick={ this._onChildClick }
          >
            { this.renderSpots() }
          </GoogleMap>
        </div>
      );
    }
  }
}

function mapStateToProps( state ) {
  return {
    spots: state.spots.all,
    center: state.search.location,
    error: state.error
  };
}

export default connect( mapStateToProps, null )( MapContainer );
