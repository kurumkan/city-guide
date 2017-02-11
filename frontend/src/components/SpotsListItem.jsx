import React, { Component } from 'react';
import { connect } from 'react-redux';

import {selectSpot, setMapCenter, changeVisitStatus} from 'actions/Actions';

export class SpotsListItem extends Component{

	constructor(props) {
		super(props);
		this.state={
			visitStatus: false,
			numVisitors: 0
		}
	}
	
	componentWillMount() {
		var {spot} = this.props;
		var userId = localStorage.getItem('userid');

		if(userId && spot.visitors &&spot.visitors.indexOf(userId)>=0)
			this.setState({visitStatus: true});		

		if(spot.visitors)
			this.setState({
				numVisitors: spot.visitors.length
			})
	}

	handleClick(key){
		var {spot} = this.props;
		if(key=='pin'){
			var {selectSpot, setMapCenter} = this.props;
			selectSpot(spot.id);
			setMapCenter({
				lat:spot.location.coordinate.latitude,
				lng:spot.location.coordinate.longitude
			});
		}else{
			var {visitStatus, numVisitors} = this.state;	
			visitStatus=!visitStatus;
			
			if(visitStatus)
				numVisitors++;
			else
				numVisitors--;

			this.setState({visitStatus, numVisitors});

			this.props.changeVisitStatus(spot.id);		
		}		
	}
	

	render() {
		var {spot, displayType, authenticated} = this.props;
		var name = spot.name.substring(0,25);
		name = name.length==25?name+'...':name;

		var {numVisitors, visitStatus} = this.state;
		var buttonClass = "glyphicon glyphicon-plus";

		if(visitStatus)		
			buttonClass = "glyphicon glyphicon-ok";		

		if(displayType=='GRID')
			return (
				<div className="col-sm-6 col-md-4 spots-list-item">
					<div className="thumbnail">
						
						<a href={spot.url} target='_blank' >
					    	<image className='img-responsive' src={spot.image_url} />
					    </a>	

						<div className="caption">
							<h3>{name}</h3>						
							<div>
					    		<span className="glyphicon glyphicon-earphone" aria-hidden="true"></span>
					    		{spot.display_phone}
					    	</div>
					    	<div>
					    		<span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
					    		{spot.location.address[0]}
					    	</div>			    				    	
					    	<div>
					    		<button className='btn btn-go' disabled={!authenticated} onClick={this.handleClick.bind(this, 'iamgoing')}>
					    			<span className={buttonClass} aria-hidden="true"></span>
					    			{numVisitors} going	
					    		</button>					    		
					    	</div>
					    	<div>
					    		<button className='btn btn-go' onClick={this.handleClick.bind(this, 'pin')}>
					    			<span className="glyphicon glyphicon-pushpin" aria-hidden="true"></span>
					    			Pinpoint
					    		</button>					    		
					    	</div>
					    	<div>
					    		<span className={"stars-container stars-"+Math.round(spot.rating*20)}>★★★★★</span>
					    	</div>
						</div>
					</div>
				</div>
			);	
		else
			return (
				<div className="panel panel-default spots-list-item">
				  	<div className="panel-body">
					  	<div className='col-sm-3'>
					  		<a href={spot.url} target='_blank' >
					    		<image className='img-responsive' src={spot.image_url} />
					    	</a>	
					    </div>	
					    <div className='col-sm-9'>
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
					    		<button className='btn btn-go' disabled={!authenticated} onClick={this.handleClick.bind(this, 'iamgoing')}>
					    			<span className={buttonClass} aria-hidden="true"></span>
					    			{numVisitors} going	
					    		</button>					    		
					    	</div>
					    	<div>
					    		<button className='btn btn-go' onClick={this.handleClick.bind(this, 'pin')}>
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

function mapStateToProps(state) {
	var {displayType} = state;
	var {authenticated} = state.auth;
	return {
		displayType,
		authenticated
	};
}

export default connect(mapStateToProps, {selectSpot, setMapCenter, changeVisitStatus})(SpotsListItem);