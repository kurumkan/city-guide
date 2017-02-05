import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from 'Nav';
import Footer from 'Footer';
import {authUser} from 'Actions';

class Main extends Component{
	componentWillMount() {		
		var {token, username, userid} = this.props.location.query;
		if(token&&username&&userid)
			this.props.authUser(token, username, userid);	
	}

	render() {		
		return (
			<div className='container-fluid main'>
				<Nav/>	
				<div className='row'>
					<div className='container-fluid content'>
						{this.props.children}	
					</div>	
				</div>	
				<Footer/>
			</div>	
		);	
	}
}

export default connect(null, {authUser})(Main);
