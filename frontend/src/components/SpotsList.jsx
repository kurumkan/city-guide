import React, { Component } from 'react';

import { connect } from 'react-redux';
import SpotsListItem from 'SpotsListItem';
import Loader from 'Loader';
import DisplaySelector from 'DisplaySelector';
import Pagination from 'Pagination';

class SpotsList extends Component{

	renderSpots(spots){
		return spots.map((spot, i)=>{
			return (				
				<SpotsListItem spot={spot} key={i}/>
			);
		})
	}

	render() {
		var {spots, term, error, isLoading} = this.props;			
		
		if(isLoading){
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
					<DisplaySelector />
					<div className='row spots-list-wrapper'>						
						{this.renderSpots(spots)}								
					</div>	
					<Pagination />
				</div>
			);	
	}
}

function mapStateToProps(state) {
	return {
		spots: state.spots.all,
		term: state.search.term,
		error: state.error,
		isLoading: state.isLoading				
	};
}

export default connect(mapStateToProps, null)(SpotsList);