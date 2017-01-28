import React, { Component } from 'react';

export default class Searchbar extends Component{
	render() {
		return (
			<form className="navbar-form navbar-left searchbar">								
				<div className="input-group">
					<input type="text" className="form-control" placeholder="Type a location"/>
					<span className="input-group-btn">
						<button className="btn btn-search" type="button">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span>
						</button>
					</span>
				</div>
			</form>			
		);	
	}
}


