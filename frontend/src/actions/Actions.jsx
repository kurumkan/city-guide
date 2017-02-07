import axios from 'axios';
import {browserHistory} from 'react-router';

const ROOT_URL = '/api/spots/';

function validateParams(term,offset,sort){
	if(typeof term != 'string' || !term)
		return false;	
	if(offset===''||isNaN(offset)||+offset<0||+offset>=988)
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
				browserHistory.push('/search?term='+term+'&offset='+offset+'&sort='+sort);						
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

export function changeVisitStatus(id){	
	return function(dispatch){
		axios.put(ROOT_URL+id, null, {
			headers: {'authorization' : localStorage.getItem('token')}				
		})
			.then((response)=>{				
				dispatch(removeErroMessage());
			})
			.catch((error)=>{								
				dispatch(setErrorMessage('Something went wrong. We are working on it.'));
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

export function setTerm(term){
	localStorage.setItem('term', term);
	return {
		type: 'SET_TERM',
		payload: term
	}
}

export function setSort(sort){
	localStorage.setItem('sort', sort);
	return {
		type: 'SET_SORT',
		payload: sort
	}
}

export function setOffset(offset){
	localStorage.setItem('offset', offset);
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

export function signinUser({login, password}){	
	
	return function(dispatch){		
		axios.post('/auth/signin', {login, password})
			.then((response)=>{				
				//-update state to indicate user is authenticated
				var {username, userid, token} = response.data;
				dispatch(authUser(token, username, userid));
			})
			.catch(()=>{
				//- show error message
				dispatch(setErrorMessage('Bad Login Info'));				
			});
	}	
}

export function signupUser({username, email, password}){
	
	return function(dispatch){		
		axios.post('/auth/signup', {username, email, password})
			.then((response)=>{			
				var {username, userid, token} = response.data;					
				dispatch(authUser(token, username, userid));	
			})
			.catch((e)=>{
				//- show error message
				dispatch(setErrorMessage('This email or username is already in use'));				
			});
	}	
}

export function authUser(token, username, userid){	
	return function(dispatch){		
		dispatch(removeErroMessage());
				
		localStorage.setItem('token', token);
		localStorage.setItem('username', username);
		localStorage.setItem('userid', userid);
		
		dispatch({
			type: 'AUTH_USER', 
			payload: {
				username,
				userid
			}
		});
		
		var term = localStorage.getItem('term');
		var sort = localStorage.getItem('sort');
		var offset = localStorage.getItem('offset');

		if(term&&sort&&offset)
			dispatch(getSpots(term, offset, sort));
		else
			browserHistory.push('/');	
	}	
}

export function signoutUser(){
	localStorage.removeItem('token');
	localStorage.removeItem('username');
	localStorage.removeItem('userid');

	localStorage.removeItem('term');
	localStorage.removeItem('sort');
	localStorage.removeItem('offset');
	browserHistory.push('/');	
	return {
		type: 'UNAUTH_USER'
	}
}


