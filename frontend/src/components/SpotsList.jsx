import React, { Component } from 'react';

import { connect } from 'react-redux';
import {getSpots} from 'Actions';
import SpotsListItem from 'SpotsListItem'

class SpotsList extends Component{

	componentWillMount() {				
		var {location} = this.props;
		if(location)
			this.props.getSpots(location);		
		else
			this.props.getSpots('london');		
	}

	render() {
		var {spots} = this.props;
		console.log('spots', spots);
		return (
			<div className='spots-list'>
				<h2>Search Results for: London</h2>
				<div>
					<SpotsListItem />
					<SpotsListItem />
					<SpotsListItem />					
				</div>	
			</div>
		);	
	}
}

function mapStateToProps(state) {
	return {
		spots: state.spots.all,
		location: state.location		
	};
}

export default connect(mapStateToProps, {getSpots})(SpotsList);