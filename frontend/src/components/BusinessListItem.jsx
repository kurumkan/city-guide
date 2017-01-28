import React, { Component } from 'react';

export default class BusinessListItem extends Component{
	render() {
		return (
			<div className="panel panel-default business-list-item">
			  <div className="panel-body">
			  	<div className='col-xs-4'>
			  		<a href='#' target='_blank' >
			    		<image className='img-responsive' src='http://demo.templatic.com/images/listing/apartments(2)-350x233.jpg' />
			    	</a>	
			    </div>	
			    <div className='col-xs-8'>
			    	<h3>					    		
			    		New Globe Walk
			    	</h3>
			    	<div>
			    		<span className="glyphicon glyphicon-earphone" aria-hidden="true"></span>
			    		+86 10 6538 5537
			    	</div>
			    	<div>
			    		<span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
			    		31 Rosary Gardens London SW7 4NH UK
			    	</div>
			    	<div>
			    		<span className="glyphicon glyphicon-time" aria-hidden="true"></span>
			    		9.00 am to 6 pm every day
			    	</div>
			    	<div>
			    		<span className="stars-container stars-70">★★★★★</span>
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
			    		This is a listing description section where you can write about your listing. 
			    		We have provided an editor for entering this information on Submit listing page so your visitors 
			    		will be able to format their description easily...  
			    		<div>
			    			<a href='#' target='_blank'>See 10 more opinions </a>
			    		</div>	
			    	</div>
			    </div>	
			  </div>
			</div>
		);	
	}
}
