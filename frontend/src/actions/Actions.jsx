import axios from 'axios';
import {browserHistory} from 'react-router';

const ROOT_URL = '/api/spots/';

function validateParams(term,offset,sort){
	if(typeof term != 'string' || !term)
		return false;	
	if(offset===''||isNaN(offset)||+offset<0||+offset>=1000)
		return false;		
	if(sort===''||isNaN(sort)||(+sort!==0&&+sort!=2))
		return false;
	return true;
}

//get list of polls
export function getSpots(term, offset, sort){
	return function(dispatch){		
		dispatch(removeErroMessage());						
		dispatch(changeLoadingStatus());		
		if(!validateParams(term,offset,sort)){
			browserHistory.push('/');
		}else{
			axios.get(ROOT_URL+'?location='+term+'&offset='+offset+'&sort='+sort+'&category_filter=bars')
			.then((response)=>{						
				dispatch({
					type: 'GET_SPOTS',
					payload: response.data.businesses
				});				
				dispatch(setMapCenter({
						lat: response.data.latitude,
						lng: response.data.longitude
					}));		
				dispatch({
						type: 'SET_SPOTS_COUNT',
						payload: response.data.total
					});		
				dispatch(changeLoadingStatus());
				dispatch(setSort(sort));
				dispatch(setTerm(term));
				dispatch(setOffset(offset));
				browserHistory.push('/search?term='+term+'&offset='+offset+'&sort='+sort);
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

export function setTerm(term){
	return {
		type: 'SET_TERM',
		payload: term
	}
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


export function changeLoadingStatus(){			
	return {
		type: 'CHANGE_LOADING_STATUS'
	}
}

export function changeDisplayType(){	
	return {
		type: 'CHANGE_DISPLAY_TYPE'		
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