import React, { Component } from 'react';

export default class DisplaySelector extends Component{
	constructor(props) {
		super(props);
		this.state={
			displayType: 'LIST'
		}
	}

	handleClick(displayType){
		this.setState({displayType})
	}
	
	render() {	
		var {displayType} = this.state; 	
		return (			
			<div className='display-selector'>
				<div className='wrapper'>								
					<div 
						className={'selector-button '+(displayType=='GRID'?'active':'')}
						onClick={this.handleClick.bind(this, 'GRID')}
					>
						<span className='glyphicon glyphicon-th' aria-hidden='true'></span>
					</div>
					<div 
						className={'selector-button '+(displayType=='LIST'?'active':'')}
						onClick={this.handleClick.bind(this, 'LIST')}
					>
						<span className='glyphicon glyphicon-th-list' aria-hidden='true'></span>
					</div>
					<div>					
						<select className="form-control">
							<option defaultValue>Sort By</option>						
							<option>Best Matched</option>
							<option>Highest Rated</option>
						</select>
					</div>
				</div>	
			</div>
		);	
	}
}
