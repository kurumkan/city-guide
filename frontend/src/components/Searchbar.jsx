import React, { Component } from 'react';
import { connect } from 'react-redux';

import {getSpots} from 'Actions';

class Searchbar extends Component{
	constructor(props) {
		super(props);		
		this.state={location:''};		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		this.setState({location: e.target.value});
	}

	handleSubmit(e){
		e.preventDefault();
		var {location} = this.state;		
		if(location){
			this.setState({location: ''});
			this.props.getSpots(location)
		}
	}
	render() {		
		return (
			<form className="navbar-form navbar-left searchbar" onSubmit={this.handleSubmit}>								
				<div className="input-group">
					<input type="text" className="form-control" placeholder="Type a location" 
						onChange={this.handleChange}
						value={this.state.location}
					/>
					<span className="input-group-btn">
						<button className="btn btn-search" type="submit">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span>
						</button>
					</span>
				</div>
			</form>			
		);	
	}
}


export default connect(null, {getSpots})(Searchbar);