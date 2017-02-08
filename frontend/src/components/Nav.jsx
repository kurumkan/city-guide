import React, { Component } from 'react';
import {connect} from 'react-redux';
import {IndexLink, Link} from 'react-router';

import NavLink from 'components/NavLink';
import Searchbar from 'components/Searchbar';
import {signoutUser} from 'actions/Actions';

class Nav extends Component{

	handleClick(e){
	    this.props.signoutUser();  
	}	

	render() {		
		var {authenticated, username} = this.props;		
		if(!authenticated)
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
		else
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
								<li className="dropdown">
									<a href="#" className="dropdown-toggle" 
										data-toggle="dropdown" role="button" 
										aria-haspopup="true" aria-expanded="false"
									>
										{username} <span className="caret"></span>
									</a>
									<ul className="dropdown-menu">
										<li className='dropdown-btn-wrapper'>									
											<button 
												onClick={this.handleClick.bind(this)} 
												className='btn btn-custom-danger btn-block'
											>
												<span className="glyphicon glyphicon-off" aria-hidden="true">													
												</span> 
												Sign Out
											</button>																	
										</li>								
									</ul>
								</li>						
							</ul>
						</div>
					</div>
				</nav>
			);			
	}
}	

function mapStateToProps(state){
	var {username, authenticated} = state.auth;
	return { username, authenticated }	
}

export default connect(mapStateToProps, {signoutUser}, null,{ pure: false })(Nav);




