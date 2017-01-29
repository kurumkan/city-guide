import axios from 'axios';
import {browserHistory} from 'react-router';

const ROOT_URL = '/api/spots/';

//get list of polls
export function getSpots(location, offset, sort){
	return function(dispatch){	
		location=location||'london';
		offset=offset||0;		
		sort=!sort||sort==0?sort:2;	

		axios.get(ROOT_URL+'?location='+location+'&offset='+offset+'&sort='+sort)
			.then((response)=>{									
				dispatch({
					type: 'GET_SPOTS',
					payload: response.data.businesses
				});
				dispatch(removeErroMessage());				
			})
			.catch(()=>{				
				dispatch(setErrorMessage('Something went wrong. We are working on it.'));
			})
	}	
}

export function setLocation(location){
	return {
		type: 'SET_LOCATION',
		payload: location
	}
}

export function setErrorMessage(error){
	return {
		type: 'SET_ERROR',
		payload: error
	}
}

export function removeErroMessage(){
	return {
		type: 'REMOVE_ERROR'
	}
}