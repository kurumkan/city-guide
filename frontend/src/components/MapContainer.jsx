import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";
import shouldPureComponentUpdate from "react-pure-render/function";
import GoogleMap from "google-map-react";

import SpotOnMap from "components/SpotOnMap";

const API_KEY = "AIzaSyBnOUUxJEsZI_9aQ3-yIF22MTbysMsEFVw";

export class MapContainer extends Component {
  static propTypes = {
    spots: PropTypes.arrayOf( {
      name: PropTypes.string,
      id: PropTypes.string,
      location: PropTypes.object
    } ),
    error: PropTypes.string,
    zoom: PropTypes.number,
    center: PropTypes.shape( {} )
  };

  static defaultProps = {
    zoom: 14,
    spots: {},
    error: "",
    center: {}
  };

  constructor( props ) {
    super( props );
    this.state = { center: null };
  }

  componentWillReceiveProps( nextProps ) {
    const { center } = nextProps;
    this.setState( { center } );
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  onChildClick = ( key, childProps ) => {
    const center = { lat: childProps.lat, lng: childProps.lng };
    this.setState( { center } );
  }

  createMapOptions( maps ) {
    return {
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_LEFT
      },
      mapTypeControl: true,
      StreetViewPanorama: true
    };
  }

  renderSpots() {
    return this.props.spots.map( ( spot ) => {
      const { latitude, longitude } = spot.location.coordinate;
      const { name, id } = spot;
      return <SpotOnMap text={ name } id={ id } key={ id } lat={ latitude } lng={ longitude } />;
    } );
  }

  render() {
    const { error, zoom } = this.props;
    const { center } = this.state;

    if ( error ) return <div className="map-container" />;
    return (
      <div className="map-container">
        <GoogleMap
          center={ center }
          zoom={ zoom }
          bootstrapURLKeys={ { key: API_KEY } }
          options={ this.createMapOptions }
          onChildClick={ this.onChildClick }
        >
          { this.renderSpots() }
        </GoogleMap>
      </div>
    );
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
