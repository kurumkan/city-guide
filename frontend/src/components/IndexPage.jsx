import React, { Component } from 'react';
import { connect } from 'react-redux';

import {authUser} from 'actions/Actions';
import Searchbar from 'components/Searchbar';

class IndexPage extends Component{		
	
	componentWillMount() {		
		var {token, username, userid} = this.props.location.query;
		if(token&&username&&userid)
			this.props.authUser(token, username, userid);	
	}

	render() {		
		return (			
			<div className='index-page row'>				
				<div className='landing-layer'>
					<div className='col-md-3'>
					</div>
					<div className='col-md-6'>												
						<Searchbar/>									
					</div>
					<div className='col-md-3'>
					</div>
				</div>	
			</div>
		);	
	}
}


export default connect(null, {authUser})(IndexPage);

