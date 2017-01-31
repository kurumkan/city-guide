import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';

import {getSpots} from 'Actions';

class Pagination extends Component{
	
	range(end) {
	    var result = [];	    	    
	    var start = end>4?end-4:1;	    
	    for (var i = start; i <= end; i++) {
	        result.push(i);
	    }	    
	    return result;
	}

	handleClick(newOffset){
		var {term, sort, getSpots} = this.props;					
		this.props.getSpots(term, newOffset, sort);		
	}

	render() {
		var {spotsCount, term, sort, offset} = this.props;	

		var pageNumber=Math.floor(offset/10)+1;			
		var total = Math.ceil(spotsCount/10);
		total=total<=100?total:100;

		var n = total;
		if(total>5){
			if(pageNumber+2<=total){
				n=pageNumber+2<5?5:pageNumber+2;
			}
		}

		var baseUrl='/search?term='+term+'&sort='+sort+'&offset=';
		var renderPageLinks = this.range(n).map((n)=>{			
			var newOffset = (n-1)*10;
			return (
				<li key={n} onClick={this.handleClick.bind(this,newOffset)} className={pageNumber===n?'active':''}>
					<Link to={baseUrl+newOffset}>{n}</Link>
				</li>
			)			
		});				

		return (
			<div className='pagination-wrapper'>				
				<div className='col-xs-5 pagination-info'>
					Page {pageNumber} of {total}
				</div>
				<div className='col-xs-7 text-right'>
					<nav aria-label="Page navigation" className='navigator'>
						<ul className="pagination pagination-custom">
							<li>
								<Link to="#" aria-label="Previous">
									<span aria-hidden="true">&laquo;</span>
								</Link>
							</li>
							{renderPageLinks}
							<li>
								<Link to="#" aria-label="Next">
									<span aria-hidden="true">&raquo;</span>
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>	
		);	
	}
}



function mapStateToProps(state) {
	var {term, sort, offset} = state.search;
	var {spotsCount} = state.spots;
	return {term, sort, offset, spotsCount};		
}

export default connect(mapStateToProps, {getSpots})(Pagination);