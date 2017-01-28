import React, { Component } from 'react';
import BusinessListItem from 'BusinessListItem';

export default class BusinessList extends Component{
	render() {
		return (
			<div className='business-list'>
				<h2>Search Results for: London</h2>
				<div>
					<BusinessListItem />
					<BusinessListItem />
					<BusinessListItem />
				</div>	
			</div>
		);	
	}
}
