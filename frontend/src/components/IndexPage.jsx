import React, { Component } from 'react';
import SpotsList from 'SpotsList'
import MapContainer from 'MapContainer';

import Alert from 'Alert';

export default class IndexPage extends Component{
	render() {
		console.log('indexpage')
		return (
			<div className='index-page row'>
				<Alert />				
				<div className='col-sm-4'>
					<MapContainer />
				</div>
				<div className='col-sm-8' id='right'>
					<SpotsList/>
				</div>
			</div>
		);	
	}
}
