import React, { Component } from 'react';

import { connect } from 'react-redux';
import {getSpots} from 'Actions';
import SpotsListItem from 'SpotsListItem';
import Loader from 'Loader';


class SpotsList extends Component{

	componentWillMount() {	
		var {term, error} = this.props;				
		this.props.getSpots(term);								
	}

	renderSpots(spots){
		return spots.map((spot, i)=>{
			return (
				<SpotsListItem spot={spot} key={i}/>
			);
		})
	}

	render() {
		var {spots, term, error} = this.props;
		//console.log('spots', spots);

		if(spots.length===0){
			return <Loader />;
		}

		if(error)
			return (
				<div className='spots-list'></div>
			);			
		else
			return (
				<div className='spots-list'>								
					<h2>Search Results for: {term}</h2>
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
		term: state.term,
		error: state.error		
	};
}

export default connect(mapStateToProps, {getSpots})(SpotsList);