import React, { Component } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import {getSpots} from 'actions/Actions';
import SpotsList from 'components/SpotsList'
import MapContainer from 'components/MapContainer';
import Alert from 'components/Alert';

export class SearchPage extends Component{		

	componentWillMount() {		
		var {term, offset, sort} = this.props.location.query;		
		var {getSpots} = this.props;		
		getSpots(term, offset, sort);		
	}

	render() {			
		return (			
			<div className='search-page row'>
				<Alert />				
				<div className='col-sm-5 no-padding'>
					<MapContainer />
				</div>
				<div className='col-sm-7 no-padding' id='right'>
					<SpotsList/>
				</div>
			</div>
		);	
	}
}

export default connect(null, {getSpots})(SearchPage);
