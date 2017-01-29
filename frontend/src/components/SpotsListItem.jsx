import React, { Component } from 'react';

export default class SpotsListItem extends Component{
	render() {
		var {spot} = this.props;
		return (
			<div className="panel panel-default spots-list-item">
			  <div className="panel-body">
			  	<div className='col-xs-3'>
			  		<a href={spot.url} target='_blank' >
			    		<image className='img-responsive' src={spot.image_url} />
			    	</a>	
			    </div>	
			    <div className='col-xs-9'>
			    	<h3>					    		
			    		{spot.name}
			    	</h3>
			    	<div>
			    		<span className="glyphicon glyphicon-earphone" aria-hidden="true"></span>
			    		{spot.display_phone}
			    	</div>
			    	<div>
			    		<span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
			    		{spot.location.address[0]}
			    	</div>			    				    	
			    	<div>
			    		<button className='btn btn-go'>
			    			<span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
			    			0 going	
			    		</button>					    		
			    	</div>
			    	<div>
			    		<button className='btn btn-go'>
			    			<span className="glyphicon glyphicon-pushpin" aria-hidden="true"></span>
			    			Pinpoint
			    		</button>					    		
			    	</div>
			    	<div>
			    		<span className={"stars-container stars-"+Math.round(spot.rating*20)}>★★★★★</span>
			    	</div>
			    	<div>
			    		{spot.snippet_text}
			    	</div>
			    	<div>
			    		<a href={spot.url} target='_blank'>See {spot.review_count} more feedbacks</a>			    		
			    	</div>
			    </div>	
			  </div>
			</div>
		);	
	}
}
