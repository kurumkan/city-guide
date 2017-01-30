import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react';

import SpotOnMap from 'SpotOnMap'
const API_KEY = 'AIzaSyBnOUUxJEsZI_9aQ3-yIF22MTbysMsEFVw';

class MapContainer extends Component {
	static defaultProps = {    
		zoom: 12    
	};  

	constructor(props) {
		super(props);
		this.state={
			center: null
		}
	}
	shouldComponentUpdate = shouldPureComponentUpdate;

	componentWillReceiveProps(nextProps) {
		var {center} = nextProps;
	  	this.setState({center});		
	}
	
	createMapOptions(maps) {
		return {
			mapTypeControlOptions: {
				position: maps.ControlPosition.TOP_LEFT
			},
			mapTypeControl: true,
			StreetViewPanorama: true
		}
	}

	_onChildClick = (key, childProps) => {		
		var center = {lat: childProps.lat, lng: childProps.lng};
		this.setState({center});		
	}

	renderSpots(){		
		return this.props.spots.map((spot)=>{
				var {latitude, longitude} = spot.location.coordinate;
				var {name, id} = spot;
				return <SpotOnMap text={name} id={id} key={id} lat={latitude} lng={longitude} />    
			}
		);
	}

	render() {  	
		var {error, zoom} = this.props;
		var {center} = this.state;

		if(error)
			return <div className='map-container'></div>
		else
			return (
				<div className='map-container'>
					<GoogleMap
						center={center}
						zoom={zoom}
						bootstrapURLKeys={{key: API_KEY}}
						options={this.createMapOptions}	
						onChildClick={this._onChildClick}					
					> 		       		       
						{this.renderSpots()}
					</GoogleMap>
				</div> 
			);
	}
}


function mapStateToProps(state) {	
	return {
		spots: state.spots.all,
		center: state.location,
		error: state.error
	};
}

export default connect(mapStateToProps, null)(MapContainer);