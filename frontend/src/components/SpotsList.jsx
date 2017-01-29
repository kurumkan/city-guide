import React, { Component } from 'react';

import { connect } from 'react-redux';
import {getSpots} from 'Actions';
import SpotsListItem from 'SpotsListItem'

class SpotsList extends Component{

	componentWillMount() {				
		var {location} = this.props;
		this.props.getSpots(location);				
	}

	renderSpots(spots){
		return spots.map((spot, i)=>{
			return (
				<SpotsListItem spot={spot} key={i}/>
			);
		})
	}

	render() {
		var {spots} = this.props;
		console.log('spots', spots);
		
		return (
			<div className='spots-list'>
				<h2>Search Results for: London</h2>
				<div>
					{this.renderSpots(spots)}		
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