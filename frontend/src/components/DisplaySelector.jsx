import React, { Component } from 'react';
import { connect } from 'react-redux';

import {getSpots, setSort} from 'Actions';

class DisplaySelector extends Component{
	constructor(props) {
		super(props);
		this.state={
			displayType: 'LIST',
			sort: '0'
		}
	}

	componentWillMount() {
		var {sort} = this.props;
		this.setState({sort});
	}

	handleClick(displayType){
		this.setState({displayType})
	}

	handleChange(e){		
		var sort = e.target.value;				
		if(sort!==this.state.sort){			
			this.setState({sort});
			var {getSpots, setSort,term} = this.props;			
			setSort(sort);			
			getSpots(term,0,sort);
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
							<option value='null'>Sort By</option>						
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
	var {term, sort} = state.search;
	return {term, sort};		
}

export default connect(mapStateToProps, {getSpots, setSort})(DisplaySelector);