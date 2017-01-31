import React, { Component } from 'react';

import { connect } from 'react-redux';
import {getSpots} from 'Actions';

class Searchbar extends Component{
	constructor(props) {
		super(props);		
		this.state={term:''};		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		this.setState({term: e.target.value});
	}

	handleSubmit(e){
		e.preventDefault();
		var {term} = this.state;		
		if(term){
			this.setState({term: ''});			
			var {sort} = this.props;			
			this.props.getSpots(term, 0, sort);		
		}
	}
	render() {		
		return (
			<form className="navbar-form navbar-left searchbar" onSubmit={this.handleSubmit}>								
				<div className="input-group">
					<input type="text" className="form-control" placeholder="Type a location" 
						onChange={this.handleChange}
						value={this.state.term}
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

function mapStateToProps(state) {
	var {term, sort} = state.search;
	return {term, sort};		
}

export default connect(mapStateToProps, {getSpots})(Searchbar);
