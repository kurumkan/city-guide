import React, { Component } from 'react';
import Searchbar from 'Searchbar';

export default class IndexPage extends Component{		
	render() {			
		return (			
			<div className='index-page row'>				
				<div className='landing-layer'>
					<div className='col-md-3'>
					</div>
					<div className='col-md-6'>												
						<Searchbar/>									
					</div>
					<div className='col-md-3'>
					</div>
				</div>	
			</div>
		);	
	}
}


