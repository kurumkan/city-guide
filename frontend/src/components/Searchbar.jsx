import React, { Component } from 'react';

export default class Searchbar extends Component{
	render() {
		return (
			<form className="navbar-form navbar-left searchbar">
				<div className="form-group">
					<input type="text" className="form-control" placeholder="Type a location"/>
				</div>
				<button type="submit" className="btn btn-search">Search</button>
			</form>			
		);	
	}
}


