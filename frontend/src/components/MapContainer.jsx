import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react';

export default class MapContainer extends Component {
  static defaultProps = {
    center: {lat: 59.938043, lng: 30.337157},
    zoom: 9    
  };  

  constructor(props) {
    super(props);
  }
  shouldComponentUpdate = shouldPureComponentUpdate;
  render() {
  	console.log('map')
    return (
    	<div className='map-container'>
	       <GoogleMap
	        defaultCenter={this.props.center}
	        defaultZoom={this.props.zoom}
	        bootstrapURLKeys={{
	    		key: 'AIzaSyBnOUUxJEsZI_9aQ3-yIF22MTbysMsEFVw',    
	  		}}
	       >    
	      </GoogleMap>
	     </div> 
    );
  }
}