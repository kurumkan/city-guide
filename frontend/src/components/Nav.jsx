import React, { Component } from 'react';
import {connect} from 'react-redux';
import {IndexLink, Link} from 'react-router';

import NavLink from 'NavLink';
import Searchbar from 'Searchbar';

class Nav extends Component{		
	render() {		
		return (
			<nav className="navbar navbar-custom">
				<div className="container-fluid">

					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#mynavbar">
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<IndexLink className="navbar-brand" to="/">
							<img alt="Brand" src="images/logo.png" />
						</IndexLink>
					</div>

					<div className="collapse navbar-collapse" id="mynavbar">
						<ul className="nav navbar-nav">							
							<NavLink to="/">Home</NavLink>												
						</ul>
						<div className='navbar-left'>
							<Searchbar />
						</div>	
						<ul className="nav navbar-nav navbar-right">
							<NavLink to="/signin">Sign In</NavLink>							
							<NavLink to="/signup">Sign Up</NavLink>							
						</ul>
					</div>
				</div>
			</nav>
		);		
	}
}	

function mapStateToProps(state){
	return {}	
}

export default connect(mapStateToProps, null, null, { pure: false })(Nav);




