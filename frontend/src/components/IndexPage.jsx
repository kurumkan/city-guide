import React, { Component } from 'react';
import SpotsList from 'SpotsList'
import MapListing from 'MapListing';

export default class IndexPage extends Component{
	render() {
		return (
			<div className='index-page row'>
				<div className='col-sm-4'>
					<MapListing />
				</div>
				<div className='col-sm-8' id='right'>
					<SpotsList/>
				</div>
			</div>
		);	
	}
}