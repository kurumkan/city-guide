import React, { Component } from 'react';
import Nav from 'Nav';
import Footer from 'Footer';

export default class Main extends Component{
	render() {
		return (
			<div className='container outer'>
				<Nav/>									
				{this.props.children}	
				<Footer/>
			</div>	
		);	
	}
}
