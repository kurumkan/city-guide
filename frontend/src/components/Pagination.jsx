import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';

import {getSpots} from 'actions/Actions';

export class Pagination extends Component{
	range(end) {
	    var result = [];	    	    
	    var start = end>4?end-4:1;	    
	    for (var i = start; i <= end; i++) {
	        result.push(i);
	    }	    
	    return result;
	}

	handleClick(newOffset){		
		var {spotsCount} = this.props;	

		if(newOffset>=0&&newOffset<988&&newOffset<spotsCount){
			var {term, sort, getSpots} = this.props;					
			this.props.getSpots(term, newOffset, sort);			
		}		
	}

	render() {
		var {spotsCount, term, sort, offset} = this.props;	

		var pageNumber=Math.floor(offset/12)+1;			
		var total = Math.ceil(spotsCount/12);
		total=total<=83?total:83;
		var n = total;
		if(total>5){
			if(pageNumber+2<=total){
				n=pageNumber+2<5?5:pageNumber+2;
			}
		}

		var baseUrl='/search?term='+term+'&sort='+sort+'&offset=';
		var renderPageLinks = this.range(n).map((n)=>{			
			var newOffset = (n-1)*12;
			return (
				<li key={n} onClick={this.handleClick.bind(this,newOffset)} className={pageNumber===n?'active':''}>
					<Link to={baseUrl+newOffset}>{n}</Link>
				</li>
			)			
		});	

		var next = pageNumber+1;
		var prev = pageNumber-1;		

		return (
			<div className='pagination-wrapper'>				
				<div className='col-xs-5 pagination-info'>
					Page {pageNumber} of {total}
				</div>
				<div className='col-xs-7 text-right'>
					<nav aria-label="Page navigation" className='navigator'>
						<ul className="pagination pagination-custom">
							<li onClick={this.handleClick.bind(this, offset-12)} className={prev>0?'':'disabled'}>
								<Link to={baseUrl+(offset-12)} aria-label="Previous">
									<span aria-hidden="true">&laquo;</span>
								</Link>
							</li>
							{renderPageLinks}
							<li onClick={this.handleClick.bind(this, offset+12)} className={next>total?'disabled':''}>
								<Link to={baseUrl+(offset+12)} aria-label="Next">
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