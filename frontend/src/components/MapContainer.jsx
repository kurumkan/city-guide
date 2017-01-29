import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react';

import SpotOnMap from 'SpotOnMap'
const API_KEY = 'AIzaSyBnOUUxJEsZI_9aQ3-yIF22MTbysMsEFVw';

class MapContainer extends Component {
  static defaultProps = {    
    zoom: 15    
  };  

  constructor(props) {
    super(props);
  }
  shouldComponentUpdate = shouldPureComponentUpdate;

	createMapOptions(maps) {
		return {
			mapTypeControlOptions: {
				position: maps.ControlPosition.TOP_LEFT
			},
			mapTypeControl: true,
			StreetViewPanorama: true
		}
	}

  render() {  	
  	var {error, center, zoom} = this.props;
  	
  	if(error)
  		return <div className='map-container'></div>
  	else
	    return (
	    	<div className='map-container'>
		       <GoogleMap
		        center={center}
		        zoom={zoom}
		        bootstrapURLKeys={{
		    		key: API_KEY,    
		  		}}
				options={this.createMapOptions}
		       > 		       		       
		       <SpotOnMap lat={51.510408} lng={-0.130103} />    
		      </GoogleMap>
		     </div> 
	    );
  }
}


function mapStateToProps(state) {	
	return {
		center: state.location,
		error: state.error
	};
}

export default connect(mapStateToProps, null)(MapContainer);