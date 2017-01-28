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
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="#">
							<img alt="Brand" src="images/logo.png" />
						</a>
					</div>

					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav">							
							<li><a href="#">Home</a></li>							
						</ul>
						<Searchbar />
						<ul className="nav navbar-nav navbar-right">
							<li><a href="#">Sign In</a></li>
							<li><a href="#">Sign Up</a></li>
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




