import React, { Component } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';


import {getSpots, setSort, setTerm, setOffset, setErrorMessage} from 'Actions';
import SpotsList from 'SpotsList'
import MapContainer from 'MapContainer';

import Alert from 'Alert';

class SearchPage extends Component{		

	componentWillMount() {		
		var {term, offset, sort} = this.props.location.query;		
		var {setSort, setTerm, setOffset, getSpots, setErrorMessage} = this.props;
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


function mapStateToProps(state) {
	var {term, sort,offset} = state.search;
	return {term, sort, offset};		
}

export default connect(mapStateToProps, {getSpots, setSort, setTerm, setOffset, setErrorMessage})(SearchPage);
