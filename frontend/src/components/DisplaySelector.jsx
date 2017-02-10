import React, { Component } from 'react';
import { connect } from 'react-redux';

import {getSpots, setSort, changeDisplayType} from 'actions/Actions';

export class DisplaySelector extends Component{
	constructor(props) {
		super(props);
		this.state={
			displayType: 'LIST',
			sort: 0
		}
	}	

	componentWillMount() {
		var {sort, displayType} = this.props;
		this.setState({sort, displayType});
	}

	handleClick(displayType){
		if(displayType!==this.state.displayType){
			this.setState({displayType});	
			this.props.changeDisplayType();
		}		
	}

	handleChange(e){		
		var sort = e.target.value;				
		if(sort!==this.state.sort){			
			var{term, setSort,getSpots} = this.props;
			this.setState({sort});
			setSort(sort);									
			getSpots(term, 0, sort);							
		}
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
						<select className="form-control" value={this.state.sort} onChange={this.handleChange.bind(this)}>
							<option disabled value='null'>Sort By</option>						
							<option value='0'>Best Matched</option>
							<option value='2'>Highest Rated</option>
						</select>
					</div>
				</div>	
			</div>
		);	
	}
}

function mapStateToProps(state) {
	var {sort, term} = state.search;
	var {displayType} = state;
	return {sort, term, displayType};		
}

export default connect(mapStateToProps, {getSpots, setSort, changeDisplayType})(DisplaySelector);