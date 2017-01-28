import React, { Component } from 'react';
import SpotsListItem from 'SpotsListItem'

export default class BusinessList extends Component{
	render() {
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
