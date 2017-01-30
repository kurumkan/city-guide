import axios from 'axios';
import {browserHistory} from 'react-router';

const ROOT_URL = '/api/spots/';

//get list of polls
export function getSpots(location='London', offset=0, sort=0){
	return function(dispatch){			
		dispatch(removeErroMessage());						
		axios.get(ROOT_URL+'?location='+location+'&offset='+offset+'&sort='+sort+'&category_filter=bars')
			.then((response)=>{				
				dispatch({
					type: 'GET_SPOTS',
					payload: response.data.businesses
				});
				dispatch({
					type: 'SET_TERM',
					payload: location
				});				
				dispatch(setMapCenter({
						lat: response.data.latitude,
						lng: response.data.longitude
					}))		
			})
			.catch((error)=>{	
				var {status} = error.response;

				if(status==400){					
					dispatch(setErrorMessage('Sorry! No results were found for the requested search. Try searching with some different keywords'));	
				}else{
					dispatch(setErrorMessage('Something went wrong. We are working on it.'));	
				}								
			})
	}	
}

export function selectSpot(id){	
	return {
		type: 'SELECT_SPOT',
		payload: id
	};
}

export function setMapCenter(coords){
	return {
		type: 'SET_MAP_CENTER',
		payload: coords
	};	
}

export function setSort(sort){
	return {
		type: 'SET_SORT',
		payload: sort
	}
}

export function setOffset(offset){
	return {
		type: 'SET_OFFSET',
		payload: offset
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